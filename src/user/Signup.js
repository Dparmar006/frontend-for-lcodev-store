import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { signUp } from "../auth/helper/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signUp({ name, email, password })
      .then((data) => {
        if (data.email == email) {
          setValues({
            ...values,
            name: "",
            email: "",
            error: "",
            success: true,
          });
        } else {
          setValues({
            ...values,
            error: true,
            success: false,
          });
          console.log(error);
        }
        console.log(data);
      })
      .catch((e) => console.log(e));
  };
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form className="form">
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                value={name}
                onChange={handleChange("name")}
                type="text"
              />
            </div>
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
            <button
              className="btn btn-success btn-block"
              onClick={handleSubmit}
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Your account has been created ! <Link to="/signin">Login</Link>
          </div>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Something went wrong{" "}
            <span role="img" aria-labelledby="crying emoji">
              😭
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up" description="Fill out details">
      {errorMessage()}
      {successMessage()}
      {signUpForm()}
      {/* <p>{JSON.stringify(values)}</p> */}
    </Base>
  );
};
export default Signup;
