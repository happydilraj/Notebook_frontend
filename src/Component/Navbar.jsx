import React, { useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import alertContext from '../Context/AlertContext'

export const Navbar = () => {
  const alert_context = useContext(alertContext)
  const {setmessage,settype,fun,setisAlert} = alert_context
  
  const navigate = useNavigate()
  const handleLogout = ()=>{
    navigate('/login')
    localStorage.removeItem("authtoken");
    setmessage("Logged out sucessfully")
    settype("primary")
    fun()
    setisAlert(5)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#" style={{fontWeight: "lighter", fontSize: "17px"}}>
          Notebook 📒
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("authtoken") ? 
          <form className="d-flex">
          
          <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </form>:
          <button className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button>
          }   
         
        </div>
      </div>
    </nav>
  );
};
