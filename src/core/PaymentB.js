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
    client_token: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated && isAuthenticated().user.id;
  const token = isAuthenticated && isAuthenticated().token;

  const getToken = (userId, token) => {
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
        const client_token = info.client_token;

        setInfo({ client_token: client_token });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  });

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + parseInt(p.price);
    });
    return amount;
  };

  const onPurchase = () => {
    setInfo({
      loading: true,
    });
    let nonce;
    console.log(info.instance, "instance");
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            if (response.error) {
              if (response.code == "1") {
                console.log("payment failed");
                signOut(() => {
                  return <Redirect to="/" />;
                });
              }
            } else {
              setInfo({ ...info, success: response.success, loading: false });
              console.log("Payment Success !");
              let productNames = "";
              products.forEach(function (item) {
                products += item.name + ", ";
              });

              const orderData = {
                products: productNames,
                transaction_id: response.transaction.id,
                amount: response.transaction.amount,
              };

              createOrder(userId, token, orderData)
                .then((response) => {
                  if (response.error) {
                    if (response.code == "1") {
                      console.log("Order Failed !");
                    }
                    signOut(() => {
                      return <Redirect to="/" />;
                    });
                  } else {
                    if (response.success == true) {
                      console.log("Order placed");
                    }
                  }
                })
                .catch((error) => {
                  setInfo({ loading: false, success: false });
                  console.log("order failed !", error);
                });
              cartEmpty(() => {
                console.log("crashed !, cart is empty");
                setReload(!reload);
              });
            }
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e, "nonce err"));
  };

  const showBtnDropIn = () => {
    console.log(
      "//////",
      info.client_token,
      "instace :",
      info.instance,
      "/////"
    );

    return (
      <div>
        {info.client_token !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.client_token }}
              onInstance={(instance) =>
                // (instance) => (info.instance = instance)
                setInfo({
                  ...info,
                  instance: instance,
                })
              }
            ></DropIn>
            {console.log(info.instance, "cant find instance")}
            <button onClick={onPurchase} className="btn btn-block btn-success">
              Pay
            </button>
          </div>
        ) : (
          <h3>Cart is empty</h3>
        )}
      </div>
    );
  };

  return (
    <div>
      <h3> Your total: $ {getAmount()}</h3>
      {showBtnDropIn()}
    </div>
  );
};
export default PaymentB;
