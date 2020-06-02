import React from "react";
import { useHistory } from "react-router-dom";
import CustomChatbot from "./CustomChatbot";
import SidebarWithRouter from "./Sidebar";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {
  const history = useHistory();
  return (
    <div className="layout">
      <SidebarWithRouter history={history}/>
      <header>
        <div className="container header-content">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="text-white text-center">
                <h1 style={{ fontSize: "5rem" }}>{title}</h1>
                <p style={{ fontSize: "2rem" }}>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={className}>{children}</div>
      <CustomChatbot />
      <footer className="fixed-footer">&copy; Truc Huynh 2020</footer>
    </div>
  );
};

export default Layout;
