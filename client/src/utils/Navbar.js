import React from 'react'
import '../App.css';
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios';

function Navbar(props) {
  let history = useHistory()

  const handleLogout = (e) => {
    e.preventDefault();
    axios
    .post("http://localhost:8001/api/logout", {}, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      localStorage.removeItem('userName')
      localStorage.removeItem('userId')
      localStorage.setItem('uRating', 0)
      if(window.location.pathname === '/chatRoom') {
        history.push('/')
      }
      window.location.reload();
    })
    .catch((err) => {
      console.log("hhhhhh",err);
    });
  };
  
  return (
    <>
      <div className="container-fluid nav_bg navbar-static-top">
        <div className="row">
          <div className="col-12 mx-auto p-0">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
              <NavLink className="nav-link" to="/"><span className="navbar-brand mb-0 h1">Stumble<span style={{color:"#676565"}}>On</span>Celluloids</span></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                {props.isLoggedIn ?
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      {/* <span className="nav-link">Welcome</span> */}
                      {/* <p className="navbar-text" style={{fontSize:"14pt", paddingTop: "12px", color:"white"}}> Welcome</p> */}
                      <span className ="navbar-text" > Welcome {props.user} </span>
                      {/* <NavLink className="nav-link" style={{paddingRight:"50px"}}to="#">Welcome {props.user} </NavLink> */}
                    </li>
                    <li className="nav-item">
                      <button className="navbar-btn" onClick={handleLogout}>Logout</button>
                      {/* <NavLink activeClassName="menu-active" className="nav-link" to="/logout">Logout</NavLink> */}
                    </li>
                  </ul>
                </div>
                :
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink activeClassName="menu-active" exact className="nav-link active" aria-current="page" to="/signin">Login</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink activeClassName="menu-active" className="nav-link" to="/registration">Register</NavLink>
                    </li>
                  </ul>
                </div>
                }
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
