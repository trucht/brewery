import React, { Component } from "react";
import SidebarIcon from "./SidebarIcon";
import { Transition } from "react-transition-group";

const duration = 1000;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export default class Sidebar extends Component {
  state = {
    isOpen: false,
  };

  renderSidebar = () => {
    if (!this.state.isOpen) {
      return null;
    }

    return (
      <div className="sidebar">
        <div className="sidebar-link">Search Bar</div>
        <div className="sidebar-link">Shop</div>
        <div className="sidebar-link">Cart</div>
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
      <div className="sidebar-container">
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
