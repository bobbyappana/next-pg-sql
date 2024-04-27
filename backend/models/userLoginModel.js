import executeQuery from "../helpers/database";

export default function userLoginModel(payload) {
  return new Promise((resolve, reject) => {
    const result = {
      status: false,
    };

    const checkSql = "SELECT * from users_data WHERE email= $1 OR user_name = $2";

    executeQuery(checkSql, [payload.email, payload.user_name])
      .then((emailResp) => {
        if (emailResp.rows.length > 0) {
          if (
            emailResp.rows[0].email == payload.email &&
            emailResp.rows[0].user_name == payload.user_name
          ) {
            result.status = true;
            result.data = emailResp.rows[0];
            result.message = "User logged in successfully";
            resolve(result);
          } else {
            if (emailResp.rows[0].email == payload.email) {
              result.status = false;
              result.message = "Please check your username";
              resolve(result);
            } else {
              result.status = false;
              result.message = "The user name is not available";
              resolve(result);
            }
          }
        } else {
          const sql =
            "INSERT INTO users_data (user_name, email) VALUES ($1, $2) RETURNING user_id, user_name, email";

          executeQuery(sql, [payload.user_name, payload.email])
            .then((response) => {
              result.status = true;
              result.data = response.rows[0];
              result.message = "User registered successfully";
              resolve(result);
            })
            .catch((err) => reject(err));
        }
      })
      .catch((err) => reject(err));
  });
}
