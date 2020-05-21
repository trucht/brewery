import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { isAuthenticated } from "../auth";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminOptions = () => {
    return (
      <div className="d-flex flex-wrap">
        <Link to="/create/category" className="option-link">
          Create New Category
        </Link>
        <Link to="/create/product" className="option-link">
          Create New Product
        </Link>
        <Link to="/admin/orders" className="option-link">
          Manage Orders
        </Link>
        <Link to="/admin/products" className="option-link">
          Manage Products
        </Link>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div>
        <h2 className="font-weight-bold mb-5">Admin Information</h2>
        <div className="acc-info ml-3">
          <p className="">{name}</p>
          <p className="">{email}</p>
          <p className="">{role === 1 ? "Admin" : `User ID: ${_id}`}</p>
        </div>
      </div>
    );
  };

  return (
    <Layout
      title="Admin Dashboard"
      description={`Welcome, ${name}`}
      className="container"
    >
      <div className="row">
        <div className="col-sm-4">{adminOptions()}</div>
        <div className="col-sm-8">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
