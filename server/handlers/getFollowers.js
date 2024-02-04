"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const getFollowers = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const { userId } = req.params;

    const db = client.db("recipz");
    const usersCollection = db.collection("users");

    const user = await usersCollection.find({ id: userId });

    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: "user not found", data: null });
    }

    const followersData = await usersCollection
      .find({ id: { $in: user.followers } })
      .project({ _id: 0, id: 1, name: 1, location: 1, picture: 1 })
      .toArray();

    res.status(200).json({
      status: 200,
      message: "Followers data retreived successfully",
      data: followersData,
    });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({
      status: 500,
      message: "Followers could not be retrieved",
      data: null,
    });
  } finally {
    client.close();
  }
};

module.exports = { getFollowers };
