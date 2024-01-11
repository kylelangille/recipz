"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const addRecipe = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const userId = req.user.sub;
    const formData = req.body;

    const recipeData = {
      ...formData,
      createdBy: userId,
    };

    const db = client.db("recipz");
    const recipeCollection = db.collection("recipes");

    await recipeCollection.insertOne(recipeData);
    res.status(200).json({
      status: 200,
      message: "Recipe added successfully",
      data: recipeData,
    });
  } catch (err) {
    console.error("Error: ", err);
    res
      .status(500)
      .json({ status: 500, message: "Recipe could not be added", data: null });
  } finally {
    client.close();
  }
};

module.exports = { addRecipe };
