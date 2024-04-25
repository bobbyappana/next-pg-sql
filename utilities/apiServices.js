export const apiPostCall = (endpoint, payload = {}) => {
  return new Promise((resolve, reject) => {
    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    fetch(endpoint, {
      method: "POST",
      headers: header,
      body: JSON.stringify(payload),
    })
      .then((res) => resolve(res.json()))
      .catch((error) => {
        reject(error);
      });
  });
};

export const apiGetCall = (endpoint) => {
  return new Promise((resolve, reject) => {
    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    fetch(endpoint, {
      method: "GET",
      headers: header,
    })
      .then((res) => resolve(res.json()))
      .catch((error) => {
        reject(error);
      });
  });
};

export const apiUpdateCall = (endpoint, payload = {}) => {
  return new Promise((resolve, reject) => {
    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    fetch(endpoint, {
      method: "PUT",
      headers: header,
      body: JSON.stringify(payload),
    })
      .then((res) => resolve(res.json()))
      .catch((error) => {
        reject(error);
      });
  });
};

export const apiDeleteCall = (endpoint) => {
  return new Promise((resolve, reject) => {
    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    fetch(endpoint, {
      method: "DELETE",
      headers: header,
    })
      .then((res) => resolve(res.json()))
      .catch((error) => {
        reject(error);
      });
  });
};
