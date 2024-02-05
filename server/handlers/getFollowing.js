"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const getFollowing = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const { userId } = req.params;

    const db = client.db("recipz");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ id: userId });

    if (!user) {
      res
        .status(404)
        .json({ status: 404, message: "User not found", data: null });
    }

    const followingData = await usersCollection
      .find({ id: { $in: user.following } })
      .project({ _id: 1, id: 1, name: 1, location: 1, picture: 1 })
      .toArray();

    res.status(200).json({
      status: 200,
      message: "Following data retrieved successfully",
      data: followingData,
    });
  } catch (err) {
    console.error("Error: ", err);
    res
      .status(500)
      .json({ status: 500, message: "Something went wrong", data: null });
  } finally {
    client.close();
  }
};

module.exports = { getFollowing };
