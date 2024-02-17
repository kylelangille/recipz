"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const saveRandomRecipe = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const { data } = req.body;

    const db = client.db("recipz");

    const recipeCollection = db.collection("recipes");
    const usersCollection = db.collection("users");

    const result = await recipeCollection.insertOne(data);

    const recipeId = result.insertedId;

    await usersCollection.updateOne(
      { id: data.userId },
      { $push: { savedRecipes: recipeId } }
    );

    res.status(200).json({
      status: 200,
      message: "Random recipe saved successfully",
      data: null,
    });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({
      status: 500,
      message: "Random recipe could not be saved",
      data: null,
    });
  } finally {
    client.close();
  }
};

module.exports = { saveRandomRecipe };
