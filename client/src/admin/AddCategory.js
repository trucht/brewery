import React, { useState } from "react";
import Layout from "../components/Layout";
import { isAuthenticated } from "../auth";
import { createCategory } from "./AdminAPI";

const AddCateogary = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError(false);
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    // make request to backend to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form>
        <div className="d-inline-block">
          <label>Name</label>
          <input
            onChange={handleChange}
            type="name"
            className="form-control"
            value={name}
            required
          />
        </div>

        <div>
          <button onClick={clickSubmit} className="btn-submit">
            Submit
          </button>
        </div>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{name} is not unique</h3>;
    }
  };

  return (
    <Layout title="Add a new Category" description={`Ready to add a new category?`} className="container">
      <div className="row">
        <div>
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCateogary;
