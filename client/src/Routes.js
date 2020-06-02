import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import AdminRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import ManageOrders from "./admin/ManageOrders";
import UpdateProduct from "./admin/UpdateProduct";
import Profile from "./user/UserProfile";
import Shop from "./core/Shop";
import Cart from "./core/Cart";
import Product from "./core/Product";
import About from "./core/About";
import RecoverPassword from "./auth/RecoverPassword";
import ResetPassword from "./auth/ResetPassword";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/product/:productId" component={Product} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/about" component={About} />
        <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
        <PrivateRoute exact path="/profile/:userId" component={Profile} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/create/category" component={AddCategory} />
        <AdminRoute exact path="/create/product" component={AddProduct} />
        <AdminRoute exact path="/admin/orders" component={ManageOrders} />
        <AdminRoute exact path="/admin/products" component={ManageProducts} />
        <AdminRoute
          exact
          path="/admin/products/update/:productId"
          component={UpdateProduct}
        />
        <Route exact path="/auth/recover" component={RecoverPassword} />
        <Route exact path="/auth/reset/:token" component={ResetPassword} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
