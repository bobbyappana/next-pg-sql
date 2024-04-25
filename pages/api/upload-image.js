import fs from "fs";
import path from "path";

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    const response = {
      status: true,
    };

    try {
      const { image } = req.body;
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      const imageId = Math.floor(Math.random() * 100);

      const filename = "uploaded_image_" + imageId + ".jpg";

      const filePath = path.join(process.cwd(), "public", "uploads", filename);
      fs.writeFileSync(filePath, buffer);

      response.imageUrl = "/uploads/" + filename;

      res.status(200).json(response);
      resolve();
    } catch (error) {
      res.status(500).json(response);
      reject(error);
    }
  });
}
