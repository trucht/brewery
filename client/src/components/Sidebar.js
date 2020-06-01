import React, { Component, Fragment } from "react";
import SidebarIcon from "./SidebarIcon";
import { Transition } from "react-transition-group";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import {itemTotal} from '../core/CartHelpers';

const duration =300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const sideBarIsOpen = (isOpen) => {
  if (isOpen) {
    return {width: "16rem"};
  }
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#C96E12" };
  } else return { color: "#808080" };
};

export default class Sidebar extends Component {
  state = {
    isOpen: false,
  };

  renderSidebar = () => {
    return (
      <div>
        <Link
          className="sidebar-link"
          style={isActive(this.props.history, "/")}
          to="/"
        >
          Home
        </Link>

        <Link
          className="sidebar-link"
          style={isActive(this.props.history, "/shop")}
          to="/shop"
        >
          Shop
        </Link>
        {!isAuthenticated() && (
          <Fragment>
            <Link
              className="sidebar-link"
              style={isActive(this.props.history, "/signin")}
              to="/signin"
            >
              Sign In
            </Link>

            <Link
              className="sidebar-link"
              style={isActive(this.props.history, "/signup")}
              to="/signup"
            >
              Sign Up
            </Link>
          </Fragment>
        )}
        {isAuthenticated() && (
          <Fragment>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <Link
                className="sidebar-link"
                style={isActive(this.props.history, "/user/dashboard")}
                to="/user/dashboard"
              >
                Dashboard
              </Link>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <Link
                className="sidebar-link"
                style={isActive(this.props.history, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                Dashboard
              </Link>
            )}

            <Link
              className="sidebar-link"
              style={isActive(this.props.history, "/cart")}
              to="/cart"
            >
              Cart{" "}
              <sup>
                  <small className="cart-badge">{itemTotal()}</small>
                </sup>
            </Link>

            <div className="sidebar-item">
              <span
                className="sidebar-link"
                style={{ cursor: "pointer", color: "#808080" }}
                onClick={() =>
                  signout(() => {
                    this.props.history.push("/");
                  })
                }
              >
                Sign Out
              </span>
            </div>
          </Fragment>
        )}
      </div>
    );
  };

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    return (
      <div className="sidebar" style={sideBarIsOpen(this.state.isOpen)}>
        <SidebarIcon
          isOpen={this.state.isOpen}
          handleClick={this.toggleSidebar}
        />
        <Transition in={this.state.isOpen} timeout={duration}>
          {(state) => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              {this.renderSidebar()}
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

export const SidebarWithRouter = withRouter(SidebarIcon);
