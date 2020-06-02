import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";
import Layout from "../components/Layout";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({ ...values, redirectToReferrer: true, loading: false });
        });
      }
    });
  };
  const signinForm = () => {
    return (
      <div className="container">
        <div className="row">
          <form className="form">
            <div className="form-group">
              <label>Email</label>
              <input
                onChange={handleChange("email")}
                type="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                onChange={handleChange("password")}
                type="password"
                className="form-control"
              />
            </div>
            <Link to="/auth/forgot-password">
              Forgot your password?
            </Link>
            <div>
              <button onClick={clickSubmit} className="btn-submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user.role === 1) return <Redirect to="/admin/dashboard" />;
      else return <Redirect to="/user/dashboard" />;
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="Member Login"
      description="Hello, Welcome Back!"
      className="container  py-5"
    >
      {showError()}
      {showLoading()}
      {redirectUser()}
      {signinForm()}
    </Layout>
  );
};

export default Signin;
