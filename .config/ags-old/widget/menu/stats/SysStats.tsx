import { createState, createComputed } from "ags"
import { execAsync } from "ags/process"
import GLib from "gi://GLib"
import { Gtk } from "ags/gtk4"

const BAR_WIDTH = 80
const BAR_HEIGHT = 300
const COLS = 14
const ROWS = 64

function readFile(path: string): string {
  try {
    const [, contents] = GLib.file_get_contents(path)
    return new TextDecoder().decode(contents)
  } catch {
    return ""
  }
}

let prevCpu = { total: 0, idle: 0 }

function parseCpuLine() {
  const line = readFile("/proc/stat").split("\n")[0]
  const parts = line.trim().split(/\s+/).slice(1).map(Number)
  const total = parts.reduce((a, b) => a + b, 0)
  const idle = parts[3] + (parts[4] || 0)
  return { total, idle }
}

function getCpuPercent(): number {
  const curr = parseCpuLine()
  const totalDiff = curr.total - prevCpu.total
  const idleDiff = curr.idle - prevCpu.idle
  prevCpu = curr
  if (totalDiff === 0) return 0
  return Math.round((1 - idleDiff / totalDiff) * 100)
}

function getRamPercent(): number {
  const lines = readFile("/proc/meminfo").split("\n")
  const get = (key: string) => {
    const line = lines.find(l => l.startsWith(key))
    return line ? parseInt(line.split(/\s+/)[1]) : 0
  }
  const total = get("MemTotal:")
  const available = get("MemAvailable:")
  return Math.round(((total - available) / total) * 100)
}

function DotsBar({ value, color }: {
  value: () => number
  color: [number, number, number]
}) {
  const [r, g, b] = color
  const stepX = BAR_WIDTH / COLS
  const stepY = BAR_HEIGHT / ROWS
  const dotR = Math.min(stepX, stepY) * 0.35

  return (
    <drawingarea
      widthRequest={BAR_WIDTH}
      heightRequest={BAR_HEIGHT}
      $={(self) => {
        self.set_draw_func((_, cr) => {
          const filled = Math.round(value() * ROWS)
          for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
              const cx = col * stepX + stepX / 2
              const cy = row * stepY + stepY / 2
              const active = (ROWS - row) <= filled
              cr.setSourceRGBA(r, g, b, active ? 1.0 : 0.12)
              cr.arc(cx, cy, dotR, 0, 2 * Math.PI)
              cr.fill()
            }
          }
        })
        setInterval(() => self.queue_draw(), 2000)
      }}
    />
  )
}

export function SysStats() {
  const [cpu, setCpu] = createState(0)
  const [ram, setRam] = createState(0)
  const [gpu, setGpu] = createState(0)

  prevCpu = parseCpuLine()

  const update = async () => {
    setCpu(getCpuPercent())
    setRam(getRamPercent())
    try {
      const out = await execAsync(
        "nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits"
      )
      setGpu(parseInt(out.trim()))
    } catch {
      setGpu(0)
    }
  }

  update()
  setInterval(update, 2000)

  const cpuPct = createComputed(() => `${cpu()}%`)
  const ramPct = createComputed(() => `${ram()}%`)
  const gpuPct = createComputed(() => `${gpu()}%`)

  return (
    <box cssClasses={["stat-pill"]} orientation={Gtk.Orientation.HORIZONTAL} spacing={16} halign={Gtk.Align.CENTER}>
      <box orientation={Gtk.Orientation.VERTICAL} halign={Gtk.Align.CENTER} spacing={4}>
        <DotsBar value={() => cpu() / 100} color={[0.97, 0.46, 0.56]} />
        <label label="CPU" cssClasses={["bar-label"]} />
        <label label={cpuPct} cssClasses={["bar-pct", "cpu-pct"]} />
      </box>
      <box orientation={Gtk.Orientation.VERTICAL} halign={Gtk.Align.CENTER} spacing={4}>
        <DotsBar value={() => ram() / 100} color={[0.48, 0.64, 0.97]} />
        <label label="RAM" cssClasses={["bar-label"]} />
        <label label={ramPct} cssClasses={["bar-pct", "ram-pct"]} />
      </box>
      <box orientation={Gtk.Orientation.VERTICAL} halign={Gtk.Align.CENTER} spacing={4}>
        <DotsBar value={() => gpu() / 100} color={[0.62, 0.81, 0.42]} />
        <label label="GPU" cssClasses={["bar-label"]} />
        <label label={gpuPct} cssClasses={["bar-pct", "gpu-pct"]} />
      </box>
    </box>
  )
}
