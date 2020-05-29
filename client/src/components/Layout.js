import React from "react";
import SidebarWithRouter from "./Sidebar";
import {useHistory} from "react-router-dom";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {

  const history = useHistory();
  return (
    <div className="d-flex position-relative">
      <div className="layout">
        <div className="header pl-3 py-5">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <SidebarWithRouter history={history} />
    </div>
  );
};

export default Layout;
