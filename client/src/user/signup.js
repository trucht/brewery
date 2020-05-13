import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, phone, email, password, success, error } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {

    e.preventDefault();

    setValues({ ...values, error: false });

    signup({ name, phone, email, password }).then((data) => {
      if (data.error)
      {
          setValues({...values, error: data.error, success: false})
      }
      else
      {
          setValues({...values, name: "", phone:"", email: "", password: "", error: "", success: true});
      }
    });
  };

  const signupForm = () => {
    return (
      <form className="form">
        <div className="form-group">
          <label>Name</label>
          <input
            onChange={handleChange("name")}
            value={name}
            type="text"
            placeholder="Ex: Truc Huynh"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            onChange={handleChange("phone")}
            value={phone}
            type="text"
            placeholder="(+84)"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={handleChange("email")}
            value={email}
            type="email"
            placeholder="Ex: newUser@gmail.com"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={handleChange("password")}
            value={password}
            type="password"
            placeholder="Your password"
            className="form-control"
          />
        </div>
        <div>
          <button onClick={clickSubmit} className="btn-submit">
            Sign Up
          </button>
        </div>
      </form>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{textAlign: "center", display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{textAlign: "center", display: success ? "" : "none" }}
      >
        New account is created. Please <Link to="/signin">Signin</Link>
      </div>
    );
  };

  return (
    <div className="form-container">
      <h1>Create Account</h1>
      {showError()}
      {showSuccess()}
      {signupForm()}
    </div>
  );
};

export default Signup;
