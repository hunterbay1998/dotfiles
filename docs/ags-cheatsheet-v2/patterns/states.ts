import { createState } from "ags"

function Counter() {
  // const is the state 
  const [count, setCount] =createState(0)

  return (
    <button onClicked={() => setCount(v => v + 1)}>
      <label label="click me" />
    </button>  
  )
}
