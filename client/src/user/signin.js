import React from 'react';


const Signin = () => {
  const signinForm = () => {
    return (
      <form className="form">
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" />
        </div>
        <div>
          <button className="btn-submit">Sign In</button>
        </div>
      </form>
    );
  };

  return (
  <div class="form-container">
    <h1>Member Login</h1>
    {signinForm()}
  </div>
  );
}

export default Signin;
