import React, { useState} from 'react'
import alertContext from './AlertContext'


export const AlertState = (props) => {

    const [message, setmessage] = useState("")
    const [type, settype] = useState("")
    const [isAlert, setisAlert] = useState("5")
    
    const fun = ()=>{
        setTimeout(() => {
            setisAlert(null)
        }, 2000);
    }   

  return (
    <alertContext.Provider value={{message,setmessage,type,isAlert,setisAlert,settype,fun}}>
        {props.children}
    </alertContext.Provider>
  )
}

export default AlertState