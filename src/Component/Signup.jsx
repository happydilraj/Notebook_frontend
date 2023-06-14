import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../Context/AlertContext'

const Login = () => {
    const navigate = useNavigate()

    const alert_context = useContext(alertContext)
    const {setmessage,settype,fun,setisAlert} = alert_context
   
   const [credentials, setcredentials] = useState({name: "", email: "", password: ""})

   const handleclick = async (e)=>{
    e.preventDefault();
    const url = "https://notebook-kn2w.onrender.com/api/auth/createuser"
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
    });
    const json = await response.json()
    if(json.success === false){
      // alert("User already exist")
      setmessage("User already exist")
      settype("warning")
      fun()
      setisAlert(5)
    }
    else{
      setmessage("Singup successful")
      settype("primary")
      localStorage.setItem("auth-token",json.authtoken);
      navigate('/login')
      fun()
      setisAlert(5)
    }
   }

   const onchange = (e)=>{
    setcredentials({...credentials,[e.target.name]: e.target.value})
   }

  return (
    <div>
        <form onSubmit={handleclick}>
        <h2>Signup to continue</h2>
        <div className="form-group my-5">
            <label htmlFor="name"><h3>Name</h3></label>
            <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onchange} required={true} placeholder="Name"/>
        </div>
        <div className="form-group my-5">
            <label htmlFor="email"><h3>Email address</h3></label>
            <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange} required={true}placeholder="Email"/>
        </div>
        <div className="form-group my-5">
            <label htmlFor="password"><h3>Password</h3></label>
            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} required={true} placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login