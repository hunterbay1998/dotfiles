import { createPoll } from "ags/time" 

export default function Clock() {
  const time = createPoll("", 1000, () => {
    const now = new Date()
    const days = [
      "Sun", 
      "Mon", 
      "Tue", 
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ]
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ] 
    const day = days[now.getDay()]
    const date = now.getDate()
    const month = months[now.getMonth()]
    const hours =
       String(now.getHours()).padStart(2, "0")
    const mins =
       String(now.getMinutes()).padStart(2, "0")
    return `${day} ${date} ${month} ${hours}:${mins}`
  })
  
  return <label cssName="clock" label={time} />

} 
