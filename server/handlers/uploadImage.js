"use strict";

const multer = require("multer");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "us-east-1",
});

const uploadImage = async (req, res) => {
  const s3 = new AWS.S3();

  const fileName = `uploads/${uuidv4()}-${req.file.originalname}`;

  const params = {
    Bucket: "recipz",
    Key: fileName,
    Body: req.file.buffer,
  };

  try {
    const data = await s3.upload(params).promise();
    const imageUrl = data.Location;

    res.status(200).json({ imageUrl });
  } catch (err) {
    console.error("Error uploading to S3: ", err);
    res.status(500).json({ status: 500, message: "Error" });
  }
};

module.exports = { uploadImage };
