import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { cartEmpty } from "./helper/cartHelper";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated, signOut } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({ products, reload = undefined, setReload = (f) => f }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated && isAuthenticated().user.id;
  const token = isAuthenticated && isAuthenticated().token;

  const getToken = (userId, token) => {
    console.log(token, userId, "token is");
    getmeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({
          ...info,
          error: info.error,
        });
        console.log(info.error);
        signOut(() => {
          return <Redirect to="/" />;
        });
      } else {
        const clientToken = info.clientToken;
        console.log(clientToken, "client token returned");
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);
  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + parseInt(p.price);
    });
    return amount;
  };

  const showBtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            ></DropIn>
            <button className="btn btn-block btn-sucess">Pay</button>
          </div>
        ) : (
          <h3>Cart is empty</h3>
        )}
      </div>
    );
  };
  return (
    <div>
      <h3> Your total: {getAmount()}</h3>
      {showBtnDropIn()}
    </div>
  );
};
export default PaymentB;
