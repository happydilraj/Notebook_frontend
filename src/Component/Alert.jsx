import React, { useContext, useEffect } from 'react'
import alertContext from '../Context/AlertContext'

export const Alert = () => {

  const alert_context = useContext(alertContext)
  const {message,type,setisAlert,isAlert} = alert_context
  const capitalise = (word)=>{
      if(word==="danger")
         word = "Info : "
      else if(word === "primary")
         word = "Success : "   
      else if(word === alert)
         word = "Alert : "

      return word
  }
  
  

  return (
    <>
      {isAlert ?
         <div style={{height: "50px"}} className={`alert alert-${type}  alert-dismissible fade show`} role="alert">
         <strong>{capitalise(type)}</strong> {message}
      
         </div>:
         <div style={{height: "50px"}}></div>
      }
    </>
  )
}
