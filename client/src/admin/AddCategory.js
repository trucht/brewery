import React, { useState } from "react";
import Layout from "../components/Layout";
import { isAuthenticated } from "../auth";
// import { Link } from "react-router-dom";
import { getCategories, createCategory, deleteCategory } from "./AdminAPI";
import { useEffect } from "react";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
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
        loadCategories();
      }
    });
  };

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const destroy = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCategories();
      }
    });
  };

  const newCategoryForm = () => (
    <div className="row my-3">
      <form className="form">
        <div className="form-group">
          <label className="text-weight-bold">Add new category</label>
          <input
            onChange={handleChange}
            type="name"
            className="form-control"
            value={name}
            required
          />
        </div>
        <div>
          <button onClick={clickSubmit} className="btn btn-info">
            Submit
          </button>
        </div>
      </form>
    </div>
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

  const manageCategories = () => {
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="text-center">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cate, i) => (
              <tr key={i}>
                <td className="d-flex justify-content-between align-items-center">
                  {cate.name}
                  <div className="">
                    <button className="btn btn-warning">Update</button>
                    <button
                      className="mx-3 btn btn-danger"
                      onClick={() => destroy(cate._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Layout
      title="Add a new Category"
      description={`Ready to add a new category?`}
      className="container py-5"
    >
      <div>
        {showSuccess()}
        {showError()}
        {newCategoryForm()}
        {manageCategories()}
      </div>
    </Layout>
  );
};

export default AddCategory;
