import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";

const iconStyle = {
  display: "block",
  textAlign: "left",
  padding: "1rem",
};

const iconSize = {
  width: "2.5rem",
  height: "2.5rem",
};

const SidebarIcon = ({ handleClick, isOpen }) => {
  return (
    <span style={iconStyle} onClick={handleClick}>
      <FontAwesomeIcon style={iconSize} icon={isOpen ? faTimes : faBars} />
    </span>
  );
};

export default SidebarIcon;
