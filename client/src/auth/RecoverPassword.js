import React, { Component } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { recoverPassword } from "./index";

class RecoverPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      submitted: false,
      error: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.clickSubmit = this.clickSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  clickSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    recoverPassword(email, window.location.host).then((data) => {
      if (data.error) {
        console.log("RecoverPassword -> clickSubmit -> data.error", data.error);
      }
      this.setState({ submitted: true });
    });
  };

  render() {
    const { email, submitted } = this.state;
    return (
      <Layout
        title="Reset your password"
        description="Send us your email to recover password"
        className="container py-5"
      >
        <div className="row">
          {submitted ? (
            <div>
              <p>
                If that account is in our system, we emailed you a link to reset
                your password.
              </p>
              <Link to="/" style={{ color: "black" }}>
                Back to homepage
              </Link>
            </div>
          ) : (
            <form className="form">
              <input
                onChange={this.handleChange}
                value={email}
                placeholder="Email address"
                className="form-control"
              />
              <button onClick={this.clickSubmit} className="btn-submit">
                Send password reset email
              </button>
            </form>
          )}
        </div>
      </Layout>
    );
  }
}

export default RecoverPassword;
