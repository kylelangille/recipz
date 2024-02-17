"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const getRecipes = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const { userId } = req.params;

    const db = client.db("recipz");
    const recipeCollection = db.collection("recipes");

    const recipes = await recipeCollection.find({ userId }).toArray();

    res.status(200).json({
      status: 200,
      message: "Recipes retrieved successfully",
      data: recipes,
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

module.exports = { getRecipes };
