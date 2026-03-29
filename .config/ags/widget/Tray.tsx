import { createBinding, For } from "ags"                   
import AstalTray from "gi://AstalTray?version=0.1"         
                                                             
  const tray = AstalTray.Tray.get_default()                  
  
  function TrayItem({ item }: { item: AstalTray.TrayItem }) {
    const gicon = createBinding(item, "gicon")             

    return (
      <button onClicked={() => item.activate(0, 0)}>
        <image gicon={gicon} pixelSize={16} />               
      </button>
    )                                                        
  }                                                        

  export default function Tray() {
    const items = createBinding(tray, "items")
                                                             
    return (
      <box cssClasses={["tray"]} spacing={4}>                
        <For each={items}>                                 
          {(item) => <TrayItem item={item} />}
        </For>
      </box>                                                 
    )
  }               
