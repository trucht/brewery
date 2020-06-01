import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getProducts } from "./CoreAPI";
import Card from "../components/Card";
import Search from "../components/Search";

const Home = () => {
  const [productsbySell, setProductsBySell] = useState([]);
  const [productsbyArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.err) {
        setError(data.err);
        console.log(error);
        setLoading(false);
      } else {
        setProductsBySell(data);
        setLoading(false);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.err) {
        setError(data.err);
        setLoading(false);
      } else {
        setProductsByArrival(data);
        setLoading(false);
      }
    });
  };

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const cultureSection = () => {
    return (
      <div className="culture-section row">
        <img
          className="col-6"
          src={require("../assets/images/beer-culture-img.png")}
          alt="beer instruction"
        />
        <div className="col-6 detailed-instruction">
          <h3 className="culture-title">
            CONNECTING CULTURES THROUGH CRAFT BEER
          </h3>
          <p className="culture-content">
            Ho Chi Minh City’s first in-house craft brewery located in the heart
            of District 1. Delivering bold and authentic flavors using the
            freshest and finest quality ingredients from the East to the West.
          </p>
        </div>
      </div>
    );
  };

  const imagesSection = () => {
    return (
      <div className="image-container d-flex flex-wrap">
        <div className="flex-col">
          <img
            className="flex-image"
            src={require("../assets/images/hochiminh-img-4.jpg")}
            alt=""
          />
        </div>
        <div className="flex-col flex-column">
          <div className="flex-row">
            <img
              className="flex-image"
              src={require("../assets/images/hochiminh-img-3.jpg")}
              alt=""
            />
          </div>
          <div className="flex-row">
            <img
              className="flex-image"
              src={require("../assets/images/hochiminh-img-2.jpg")}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  };

  const mapSection = () => {
    return (
      <iframe
        title="dath"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15676.481345341474!2d106.7145888!3d10.8020945!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6c3d29d370b52a7e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBIdXRlY2g!5e0!3m2!1svi!2s!4v1590920536749!5m2!1svi!2s"
        aria-hidden="false"
      ></iframe>
    );
  };

  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
    showLoading();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout title="Beer Brewery" description="Beer E-commerce">
      {cultureSection()}
      {imagesSection()}
      <Search />
      <h3 className="m-4 culture-title text-center">NEW ARRIVALS</h3>
      {showLoading()}
      <div className="row container">
        {productsbyArrival.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
      <div className="signature">
        <div className="signature-item">Highest quality ingredients</div>
        <div className="signature-item">Soft and purified water used</div>
        <div className="signature-item">New and modern equipments</div>
      </div>
      <h3 className="m-4 culture-title text-center">BEST SELLERS</h3>
      {showLoading()}
      <div className="row container">
        {productsbySell.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
      {mapSection()}
    </Layout>
  );
};

export default Home;
