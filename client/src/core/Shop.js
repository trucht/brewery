import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { getCategories, getFilteredProducts } from "./CoreAPI";
import Checkbox from "../components/Checkbox";
import RadioBox from "../components/RadioBox";
import { prices } from "./FixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
        setLoading(false);
      } else {
        setCategories(data);
        setLoading(false);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setFilteredResults(data.data);
        setLoading(false);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setLoading(false);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div className="text-center">
          <button onClick={loadMore} className="btn btn-warning mb-5">
            Load more
          </button>
        </div>
      )
    );
  };

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
    showLoading();
    //eslint-disable-next-line
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container py-5"
    >
      <div className="row">
        <div className="col-lg-3">
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter by price range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>

        <div className="col-lg-9" >
          <h2 className="container">Products</h2>
          {showLoading()}
          <div className="row">
            {filteredResults.map((product, i) => (
              <div key={i} className="col-lg-4 col-md-6 mb-4">
                <Card product={product}/>
              </div>
            ))}
          </div>
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
