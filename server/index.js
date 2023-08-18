const express = require("express");
const fileUpload = require("express-fileupload");
const sharp = require("sharp");
const cors = require("cors");

const app = express();

app.use(fileUpload());
app.use(cors());

app.post("/blur-photo", (req, res) => {
  const photo = req.files.photo;
  sharp(photo.data)
    .blur(10)
    .toBuffer() // Convert the processed image to a buffer
    .then((buffer) => {
      // Send the processed image buffer as a response
      res.set("Content-Type", "image/jpeg"); // Set the appropriate content type
      res.send(buffer);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while processing the image.");
    });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
