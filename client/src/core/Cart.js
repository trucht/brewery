import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { getCart } from "./CartHelpers";
import Card from "../components/Card";
import Checkout from "../components/Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  const noItemsMessage = () => {
    return (
      <div>
        <h2 className="my-3">Your cart is empty</h2>
        <br />
        <Link to="/shop">Start Shopping now!</Link>
      </div>
    );
  };

  const showItems = (items) => {
    return (
      <div>
        <h2 className="my-3">Your cart has {`${items.length}`} items</h2>
        {items.map((p, i) => (
          <Card
            key={i}
            product={p}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  return (
    <Layout
      title="My Cart"
      description="Manage your cart items. Add, Remove, Checkout or continue shopping"
      className="container py-5"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6">
          <h2 className="my-3">Cart summary</h2>
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
