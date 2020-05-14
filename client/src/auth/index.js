// Register User
export const signup = async (user) => {
  return fetch (`/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => {
      return res.json();
    })
    .catch((err) => {
      console.log("err", err);
    });
};


// Login User
export const signin = async (user) => {
  return fetch(`/auth/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Save token in storage
export const authenticate = (token, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(token));
    next();
  }
};

// Signout so destroy the local token
export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`/auth/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout", response);
      })
      .catch((err) => console.log(err));
  }
};

// Return if user is authenticated or not
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
