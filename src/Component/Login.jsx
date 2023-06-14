import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../Context/AlertContext'

const Login = () => {
    const navigate = useNavigate()

    const alert_context = useContext(alertContext)
    const {setmessage,settype,fun,setisAlert} = alert_context
   
   const [credentials, setcredentials] = useState({email: "", password: ""})

   const handleclick = async (e)=>{
    e.preventDefault();
    const url = "https://notebook-kn2w.onrender.com/api/auth/login"
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json()
    if(json.success === false){
        setmessage("invalid credentials")
        settype("danger")
        fun()
        setisAlert(5)
        
    }
    else{
        localStorage.setItem("authtoken",json.authtoken);
        navigate('/')
        setmessage("Logged IN")
        settype("primary")
        fun()
        setisAlert(5)
    }
   }

   const onchange = (e)=>{
    setcredentials({...credentials,[e.target.name]: e.target.value})
   }

  return (
    <div className='container my-3'>
        {/* <h2>Login to continue</h2> */}
        <form onSubmit={handleclick}>
        <div className="form-group my-5">
            <label htmlFor="email"><h3>Email address</h3></label>
            <input type="email" className="form-control" id="email" name='email' value={credentials.email} required={true} onChange={onchange} placeholder="Email"/>
        </div>
        <div className="form-group my-5">
            <label htmlFor="password"><h3>Password</h3></label>
            <input type="password" className="form-control" id="password" name='password' value={credentials.password} required={true} onChange={onchange} placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login