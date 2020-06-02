import React from "react";

const ShowImage = ({ item, url }) => {
  return (
    <img
      className="card-img-top responsive-img"
      src={`/${url}/photo/${item._id}`}
      alt={item.name}
    />
  );
};

export default ShowImage;
