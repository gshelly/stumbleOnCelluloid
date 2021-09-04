import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
const Register = () => {
  // Define state vars
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      email,
      name: firstName,
      password,
      confirmPassword,
    };
    try {
      await axios.post("http://localhost:8001/api/register", postData);
      navigate("/login");
    } catch (err) {
      console.log(err.response.data.errors);
     
      setErr(err.response.data.errors);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
     {err.email && <p style={{ color: "red" }}>{err.email.message}</p>}
      <div>
        First Name:{" "}
        <input type="text" onChange={(e) => setFirstName(e.target.value)} />
      </div>

      <div>
        Last Name:
        <input type="text" onChange={(e) => setLastName(e.target.value)} />
      </div>

      <div>
        Email:
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        Password:
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div>
        Confirm Password:
        <input
          type="text"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default Register;