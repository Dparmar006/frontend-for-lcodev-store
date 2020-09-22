import React, { useState, useEffect } from "react";

import { getProducts } from "./helper/coreApiCalls";
export default function Home() {
  const [products, setProducts] = useState([]);
  //    var,      how to change that var
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  });

  return (
    <div>
      <h1>Home component</h1>
      <div className="row">
        {products.map((product, index) => {
          return (
            <div key={index}>
              <h1>{product.name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
