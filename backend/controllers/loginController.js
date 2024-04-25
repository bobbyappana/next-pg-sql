import userLoginModel from "../../backend/models/userLoginModel";

export function userLoginController(payload) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    userLoginModel(payload)
      .then((emailResponse) => {
        if (emailResponse) {
          resolve(emailResponse);
        } else {
          response.message = "Something went wrong!";
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
