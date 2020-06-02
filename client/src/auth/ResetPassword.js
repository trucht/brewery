import React, { Component } from "react";
import {reset, resetPassword} from "./index";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      matchedPassword: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      matchedPassword: (this.state.confirmPassword === this.state.password)
    });
    if (this.state.confirmPassword === this.state.password) {
      resetPassword(this.state.password, this.props.match.params.token).then(data => {
        if(data.error)
        {
          console.log("ResetPassword -> handleSubmit -> data.error", data.error)
        }

      })
    }
  }

  showError() {
    return (
      <div>
        {!this.state.matchedPassword && (
          <div className="alert alert-danger" role="alert">
            Password aren't matched
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div>
        <form>
          <label>New Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            autoComplete="password"
            type="password"
          />
          <label>Confirm New Password</label>
          <input
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            autoComplete="confirm-password"
            type="password"
          />
          {this.showError()}
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
