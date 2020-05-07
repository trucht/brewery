import React from 'react';


const Signup = () => {

  // const [values, setValues] = useState({
  //   name: '',
  //   phone: '',
  //   email: '',
  //   password: '',
  //   error: '',
  //   success: false
  // });

  // const {name, phone, email, password, success, error} = values;

  const signupForm = () => {
    return (
      <form className="form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" />
        </div>
        <div>
          <button className="btn-submit">Submit</button>
        </div>
      </form>
    );
  };

  return (
  <div class="form-container">
    <h1>Create Account</h1>
    {signupForm()}
  </div>
  );
}

export default Signup;
