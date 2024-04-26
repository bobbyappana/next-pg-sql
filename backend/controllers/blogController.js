import {
  addBlogModel,
  blogListModel,
  blogDetailsModel,
  userBlogListMOdel,
  updateBlogModel,
  deleteBlogModel,
} from "../../backend/models/blogModel";

export function addBlogController(payload) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    addBlogModel(payload)
      .then((blogResponse) => {
        if (blogResponse) {
          response.status = true;
          response.message = "Blog added successfully";
          resolve(response);
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

export function getBlogsController() {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    blogListModel()
      .then((blogResponse) => {
        if (blogResponse.length > 0) {
          response.status = true;
          response.data = blogResponse;
          response.message = "Users blogs list";
          resolve(response);
        } else {
          response.status = true;
          response.data = [];
          response.message = "No blogs found!";
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function blogsDetailsController(blogId) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    blogDetailsModel(blogId)
      .then((blogResponse) => {
        if (blogResponse.length > 0) {
          response.status = true;
          response.data = blogResponse[0];
          response.message = "Users blog details";
          resolve(response);
        } else {
          response.message = "No blogs found!";
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function userBlogListController(userId) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    userBlogListMOdel(userId.id)
      .then((blogResponse) => {
        if (blogResponse.length > 0) {
          response.status = true;
          response.data = blogResponse;
          response.message = "Users blog list";
          resolve(response);
        } else {
          response.message = "No blogs found!";
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function updateBlogController(payload) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    updateBlogModel(payload)
      .then((blogResponse) => {
        if (blogResponse) {
          response.status = true;
          response.message = "Blog updated successfully";
          resolve(response);
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

export function deleteBlogController(blogId) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    deleteBlogModel(blogId.id)
      .then((blogResponse) => {
        if (blogResponse) {
          response.status = true;
          response.message = "Blog deleted successfully";
          resolve(response);
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
