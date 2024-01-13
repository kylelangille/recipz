"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const MONGO_URI = process.env.MONGO_URI;

const addRecipe = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const formData = req.body;

    const recipeId = uuidv4();

    const recipeData = {
      _id: recipeId,
      ...formData,
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
