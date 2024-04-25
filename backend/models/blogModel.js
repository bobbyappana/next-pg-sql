import executeQuery from "../helpers/database";

export function addBlogModel(payload) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO user_blogs (title, description, user_name, user_id, image_url) VALUES ($1, $2, $3, $4, $5)";

    executeQuery(sql, [
      payload.title,
      payload.description,
      payload.user_name,
      payload.user_id,
      payload.image_url,
    ])
      .then((response) => {
        resolve(true);
      })
      .catch((err) => reject(err));
  });
}

export function blogListModel() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user_blogs ORDER BY blog_id DESC";

    executeQuery(sql)
      .then((response) => {
        resolve(response.rows);
      })
      .catch((err) => reject(err));
  });
}

export function blogDetailsModel(blogId) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user_blogs WHERE blog_id = $1";

    executeQuery(sql, [blogId])
      .then((response) => {
        resolve(response.rows);
      })
      .catch((err) => reject(err));
  });
}

export function userBlogListMOdel(userId) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user_blogs WHERE user_id = $1 ORDER BY blog_id DESC";

    executeQuery(sql, [userId])
      .then((response) => {
        resolve(response.rows);
      })
      .catch((err) => reject(err));
  });
}

export function updateBlogModel(payload) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE user_blogs SET title=$1, description=$2, image_url=$3 WHERE blog_id= $4";

    executeQuery(sql, [payload.title, payload.description, payload.image_url, payload.blog_id])
      .then((response) => {
        resolve(true);
      })
      .catch((err) => reject(err));
  });
}

export function deleteBlogModel(blog_id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM user_blogs WHERE blog_id= $1";

    executeQuery(sql, [blog_id])
      .then((response) => {
        resolve(true);
      })
      .catch((err) => reject(err));
  });
}
