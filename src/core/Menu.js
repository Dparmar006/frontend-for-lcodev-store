import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signOut } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history, path }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark p-2">
        <li className="nav-item text-white">
          <Link className="nav-link" style={currentTab(history, "/")} to="/">
            Home
          </Link>
        </li>

        <li className="nav-item text-white">
          <Link
            className="nav-link"
            style={currentTab(history, "/cart")}
            to="/cart"
          >
            Cart
          </Link>
        </li>
        {isAuthenticated() && (
          <li className="nav-item text-white">
            <Link
              className="nav-link"
              style={currentTab(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item text-white">
              <Link
                className="nav-link"
                style={currentTab(history, "/signin")}
                to="/signin"
              >
                SignIn
              </Link>
            </li>
            <li className="nav-item text-white">
              <Link
                className="nav-link"
                style={currentTab(history, "/signup")}
                to="/signup"
              >
                SignUp
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item text-white">
            <span
              onClick={() => {
                signOut(() => {
                  history.push("/");
                });
              }}
              className="nav-link text-danger"
              style={currentTab(history, "/signout")}
              to="/signout"
            >
              SignOut
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
