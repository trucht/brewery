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
    <div className="d-flex">
      <div className="layout">
        <div className="header py-5">
          <h1>{title}</h1>
          <p className="text-center">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <SidebarWithRouter history={history} />
    </div>
  );
};

export default Layout;
