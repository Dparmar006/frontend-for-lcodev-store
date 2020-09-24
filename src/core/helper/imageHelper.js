import React from "react";

const imageHelper = ({ product }) => {
  const imageUrl = product
    ? product.image
    : `https://images.unsplash.com/photo-1500160503851-c04cefe545a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageUrl}
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb3 rounded"
        alt="product"
      />
    </div>
  );
};

export default imageHelper;
