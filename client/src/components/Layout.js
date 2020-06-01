import React from "react";
import SidebarWithRouter from "./Sidebar";
import { useHistory } from "react-router-dom";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {
  const history = useHistory();
  return (
    <div className="position-relative">
      <div className="layout">
        <div className="header pl-3 py-5">
          <div className="header-section">
            <h1 style={{ fontSize: "5rem" }}>{title}</h1>
            <p style={{ fontSize: "2rem" }}>{description}</p>
          </div>
        </div>
        <div className={className}>{children}</div>
      </div>
      <SidebarWithRouter history={history} />
      <div className="footer">
      </div>
      <div className="fixed-footer">
        &copy; Truc Huynh 2020
      </div>
    </div>
  );
};

export default Layout;
