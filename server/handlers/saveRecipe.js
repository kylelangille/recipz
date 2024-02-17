"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const saveRecipe = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const db = client.db("recipz");
    const usersCollection = db.collection("users");

    const { recipeId } = req.params;
    const { id: userId } = req.body;

    await usersCollection.updateOne(
      { id: userId },
      { $addToSet: { savedRecipes: recipeId } }
    );

    res
      .status(200)
      .json({ status: 200, message: "Recipe saved successfully", data: null });
  } catch (err) {
    console.error("Backend error saving recipe: ", err);
    res
      .status(500)
      .json({ status: 500, message: "Something went wrong", data: null });
  } finally {
    client.close();
  }
};

module.exports = { saveRecipe };
