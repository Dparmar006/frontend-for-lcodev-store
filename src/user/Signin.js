import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";
import Base from "../core/Base";

const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "hello@gmail.com",
    password: "12345",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });

  const {
    name,
    email,
    password,
    error,
    success,
    loading,
    didRedirect,
  } = values;

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({
      ...values,
      error: false,
      loading: true,
    });
    signin({ email, password })
      .then((data) => {
        console.log("data", data);
        if (data.token) {
          // let sessionToken = data.token;
          authenticate(data, () => {
            console.log("token added");
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        } else {
          setValues({
            ...values,
            loading: false,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form className="form">
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                value={email}
                onChange={handleChange("email")}
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">password</label>
              <input
                className="form-control"
                value={password}
                onChange={handleChange("password")}
                type="password"
              />
            </div>
            <button className="btn btn-success btn-block" onClick={onSubmit}>
              SignIn
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="SignIn" description="Enter Email and Password">
      {loadingMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-center"></p>
    </Base>
  );
};

export default Signin;
