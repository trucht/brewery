import React, { Component } from "react";
import { Link } from "react-router-dom";
import { recoverPassword } from "./index";

class RecoverPassword extends Component {
  state = {
    email: "",
    submitted: false,
  };

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  clickSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    recoverPassword(email).them((data) => {

    });
  };
  render() {
    const { email, submitted } = this.state;
    return (
      <div>
        <h3>Reset your password</h3>
        {submitted ? (
          <div className="reset-password-form-sent-wrapper">
            <p>
              If that account is in our system, we emailed you a link to reset
              your password.
            </p>
            <Link to="/login" className="ghost-btn">
              Return to sign in
            </Link>
          </div>
        ) : (
          <div>
            <form onSubmit={this.sendPasswordResetEmail}>
              <input
                onChange={this.handleChange}
                value={email}
                placeholder="Email address"
              />
              <button onClick={this.clickSubmit} className="btn-submit">
                Send password reset email
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default RecoverPassword;
