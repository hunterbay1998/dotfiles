import { createBinding, createComputed } from "ags"                          
import AstalNetwork from "gi://AstalNetwork?version=0.1"
                                                                               
const network = AstalNetwork.get_default()                                   
                                                                               
  export default function Wifi() {                                             
    const ssid = createBinding(network.wifi, "ssid")
    const strength = createBinding(network.wifi, "strength")                   
    const primary = createBinding(network, "primary")       

    const label = createComputed(() => {                                       
      if (primary() === AstalNetwork.Primary.WIRED) {
        return "󰈀 Ethernet"                                                    
      }                                                     

      if (primary() === AstalNetwork.Primary.UNKNOWN) {                        
        return "󰤭 Disconnected"
      }                                                                        
                                                            
      const s = strength()
      const icon = s >= 80 ? "󰤨 " :
                   s >= 60 ? "󰤥 " :
                   s >= 40 ? "󰤢 " :                                             
                   s >= 20 ? "󰤟 " :
                   s >= 10 ? "󰤯 " :                                             
                   "󰤭"                                                         
   
      return `${icon} ${ssid()}`                                               
    })                                                      

    return (
      <label cssClasses={["wifi"]} label={label} />
    )
  }
