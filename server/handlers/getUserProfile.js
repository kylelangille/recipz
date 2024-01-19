"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const getUserProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const { userId } = req.params;

    const db = client.db("recipz");
    const userCollection = db.collection("users");

    const userData = await userCollection.findOne({ id: userId });

    if (userData) {
      res.status(200).json({
        status: 200,
        message: "User data retrieved successfully",
        data: userData,
      });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "User not found", data: null });
    }
  } catch (err) {
    console.error("Error: ", err);
    res
      .status(500)
      .json({ status: 500, message: "Something went wrong", data: null });
  } finally {
    client.close();
  }
};

module.exports = { getUserProfile };
