// component name must be Capitalised                        
function MyButton() {                                     
  // () wraps multi-line JSX                                 
  return (
    <button onClicked={() => console.log("clicked")}>        
      <label label="click me" />                          
    </button>                                                
  )
}           



//Component                                                    
  //a function that returns JSX
  //must be Capitalised                                        
  //use it like a tag: <MyButton />                            
  //lowercase = builtin widget, Capitalised = your component
  // => is how you write a short function inline, without giving it a name.          // window is the root — everything lives inside one
