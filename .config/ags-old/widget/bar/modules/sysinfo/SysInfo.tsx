import { createPoll } from "ags/time"
import GLib from "gi://GLib"

function readFile(path: string): string {
  try {
    const [, contents] = GLib.file_get_contents(path)
    return new TextDecoder().decode(contents)
  } catch {
    return ""
  }
}

let prevCpu = { total: 0, idle: 0 }

function initCpu() {
  const line = readFile("/proc/stat").split("\n")[0]
  const parts = line.trim().split(/\s+/).slice(1).map(Number)
  prevCpu = {
    total: parts.reduce((a, b) => a + b, 0),
    idle: parts[3] + (parts[4] || 0),
  }
}

function getCpuPercent(): number {
  const line = readFile("/proc/stat").split("\n")[0]
  const parts = line.trim().split(/\s+/).slice(1).map(Number)
  const total = parts.reduce((a, b) => a + b, 0)
  const idle = parts[3] + (parts[4] || 0)
  const totalDiff = total - prevCpu.total
  const idleDiff = idle - prevCpu.idle
  prevCpu = { total, idle }
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

initCpu()

export default function SysInfo() {
  const label = createPoll("", 2000, () => {
    const cpu = getCpuPercent()
    const ram = getRamPercent()
    return `  ${cpu}%  ${ram}%`
  })

  return <label cssClasses={["sysinfo"]} label={label} />
}
