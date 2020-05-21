// Create category
export const createCategory = async(token, category) => {
  return fetch(`/categories/`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category)
  })
  .then(res => {
    return res.json();
  })
  .catch((err) => {
    console.log("err", err);
  });
}

