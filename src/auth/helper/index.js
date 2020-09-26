import { API } from "../../backend";
import { cartEmpty } from "../../core/helper/cartHelper";
export const signUp = (user) => {
  return fetch(`${API}user/`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })

    .catch((err) => console.log(err));
};

export const signin = (user) => {
  const formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
  }

  // const { email, password } = user;
  // const formData = new FormData();
  // formData.append("email", email);
  // formData.append("password", password);

  for (var key of formData.keys()) {
    console.log("my key", key);
  }
  return fetch(`${API}user/login/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("sucess", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const signOut = (next) => {
  const userId = isAuthenticated() && isAuthenticated().user.id;

  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    cartEmpty(() => {});

    return fetch(`${API}user/logout/${userId}`, {
      method: "GET",
    })
      .then((respose) => {
        console.log("signed out");
        next();
      })
      .catch((err) => console.log(err));
  }
};
