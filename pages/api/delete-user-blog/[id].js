import { deleteBlogController } from "../../../backend/controllers/blogController";

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };
    
    deleteBlogController(req.query)
      .then((resp) => {
        res.status(200).json(resp);
        resolve();
      })
      .catch((error) => {
        response.error = error;
        res.status(400).json(response);
        resolve();
      });
  });
}
