import React, { Component } from "react";
import { reset, resetPassword } from "./index";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      matchedPassword: true,
      error: "",
      success: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
  }

  init(token) {
    reset(token);
  }

  componentDidMount() {
    this.init(this.props.match.params.token);
  }

  componentWillUnmount() {
    this.init(this.props.match.params.token);
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      matchedPassword: this.state.confirmPassword === this.state.password,
    });
    if (this.state.confirmPassword === this.state.password) {
      resetPassword(this.state.password, this.props.match.params.token).then(
        (data) => {
          if (data.error) {
            this.setState({
              error: data.error,
              success: false,
            });
          } else {
            this.setState({
              error: "",
              success: true,
            });
          }
        }
      );
    } else {
      this.setState({
        error: "Passwords are not matched",
      });
    }
  }

  showError() {
    return (
      <div>
        <div
          className="alert alert-danger"
          style={{
            textAlign: "center",
            display: this.state.error ? "" : "none",
          }}
        >
          {this.state.error}
        </div>
      </div>
    );
  }

  showSuccess() {
    return (
      <div
        className="alert alert-info"
        style={{
          textAlign: "center",
          display: this.state.success ? "" : "none",
        }}
      >
        Your password has been updated. Please <Link to="/signin">Signin</Link>
      </div>
    );
  }

  render() {
    return (
      <Layout
        className="container py-5"
        title="Reset Password"
        description="Please update your new password here"
      >
        {this.showSuccess()}
        {this.showError()}
        <div className="row">
          <form className="form">
            <label>New Password</label>
            <input
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="password"
              type="password"
            />
            <label>Confirm New Password</label>
            <input
              className="form-control"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              autoComplete="confirm-password"
              type="password"
            />
            <button onClick={this.handleSubmit} className="btn-submit">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    );
  }
}

export default ResetPassword;
