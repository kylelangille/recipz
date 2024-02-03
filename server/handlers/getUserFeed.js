"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const getUserFeed = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const { userId } = req.params;

    const db = client.db("recipz");
    const recipesCollection = db.collection("recipes");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ id: userId });
    const followingIds = user.following;

    const followingRecipes = await recipesCollection
      .find({
        userId: { $in: followingIds },
      })
      .toArray();

    const randomRecipes = await recipesCollection
      .aggregate([{ $sample: { size: 10 } }])
      .toArray();

    const userFeed = followingRecipes.concat(randomRecipes);

    const uniqueIdsSet = new Set();

    const uniqueFeed = userFeed.filter((recipe) => {
      if (!uniqueIdsSet.has(recipe._id)) {
        uniqueIdsSet.add(recipe._id);
        return true;
      }
      return false;
    });

    if (userFeed.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "User feed not found", data: null });
    }

    res.status(200).json({
      status: 200,
      message: "User feed retrieved successfully",
      data: uniqueFeed,
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

module.exports = { getUserFeed };
