import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { isAuthenticated } from "../auth";
import { getPurchaseHistory } from "./UserAPI";
import moment from "moment";

const UserDashboard = () => {
  const {
    user: { _id, name, email, role },
    token,
  } = isAuthenticated();

  const [history, setHistory] = useState([]);

  // const init = (userId, token) => {
  //     getPurchaseHistory(userId, token).then(data => {
  //         if(data.error)
  //         {
  //             console.log(data.error)
  //         }
  //         else
  //         {
  //             setHistory(data);
  //         }
  //     })
  // }

  // useEffect(() => {
  //     init(_id, token)
  //     //eslint-disable-next-line
  // }, [])

  const userOptions = () => {
    return (
      <div className="d-flex flex-wrap">
        <Link to="/cart" className="option-link">
          My Shopping Cart
        </Link>
        <Link to={`/profile/${_id}`} className="option-link">
          Update Profile
        </Link>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div>
        <h2 className="font-weight-bold mb-5">Account Information</h2>
        <div className="acc-info ml-3">
          <p className="">{name}</p>
          <p className="">{email}</p>
          <p className="">{role === 1 ? "Admin" : `User ID: ${_id}`}</p>
        </div>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className="mt-5">
        <h2 className="font-weight-bold">Purchase history</h2>
        {/* <ul className="">
                    <li className="">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ${p.price}
                                                </h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul> */}
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Welcome, ${name}`}
      className="container"
    >
      <div className="row">
        <div className="col-sm-4">{userOptions()}</div>
        <div className="col-sm-8">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
