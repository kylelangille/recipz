"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const deleteProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const db = client.db("recipz");
    const usersCollection = db.collection("users");
    const recipesCollection = db.collection("recipes");

    const { userId } = req.body;

    const deleteProfileResult = await usersCollection.deleteOne({ id: userId });

    const deleteRecipesResult = await recipesCollection.deleteMany({
      userId: userId,
    });

    if (deleteProfileResult === 0 || deleteRecipesResult === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Profile not found", data: null });
    }

    res.status(200).json({
      status: 200,
      message: "Profile deleted successfully",
      data: null,
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

module.exports = { deleteProfile };
