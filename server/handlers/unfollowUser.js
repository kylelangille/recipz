"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const unfollowUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const db = client.db("recipz");
    const usersCollection = db.collection("users");

    const { userId } = req.params;
    const { loggedInUserId } = req.body;

    await usersCollection.updateOne(
      { id: loggedInUserId },
      { $pull: { following: userId } }
    );

    await usersCollection.updateOne(
      { id: userId },
      { $pull: { followers: loggedInUserId } }
    );

    res
      .status(200)
      .json({ status: 200, message: "User followed successfully", data: null });
  } catch (err) {
    console.error("Error: ", err);
    res
      .status(500)
      .json({ status: 500, message: "Something went wrong", data: null });
  } finally {
    client.close();
  }
};

module.exports = { unfollowUser };
