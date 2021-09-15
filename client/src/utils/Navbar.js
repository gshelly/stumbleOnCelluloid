import React from 'react'
import '../App.css';
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios';

function Navbar(props) {
  let history = useHistory()

  const handleLogout = (e) => {
    e.preventDefault();
    axios
    .post("http://localhost:8000/api/logout", {}, {
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
      console.log(err);
    });
  };
  
  return (
    <>
      <div className="container-fluid nav_bg navbar-static-top">
        <div className="row">
          <div className="col-12 mx-auto p-0">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
              <NavLink className="nav-link" to="/"><span className="navbar-brand mb-0 h1 ">Stumble<span style={{color:"white"}}>On</span>Celluloids</span></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                {props.isLoggedIn ?
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <span className ="navbar-text" > Welcome {props.user} </span>
                    </li>
                    <li className="nav-item">
                    <NavLink activeClassName="menu-active" className="nav-link" style={{padding: "0px", marginRight:"30px"}} to="/chatRoom">Join The Discussion</NavLink>
                    </li>
                    <li className="nav-item">
                      <button className="navbar-btn" onClick={handleLogout}>Logout</button>
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
