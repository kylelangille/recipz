"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const getSpecificRecipe = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const { recipeId } = req.params;
    console.log(recipeId);

    const db = client.db("recipz");
    const recipeCollection = db.collection("recipes");

    const recipeData = await recipeCollection.findOne({ _id: recipeId });
    if (!recipeData) {
      return res
        .status(404)
        .json({ status: 404, message: "Recipe not found", data: null });
    }
    res.status(200).json({
      status: 200,
      message: "Recipe retrived successfully",
      data: recipeData,
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

module.exports = { getSpecificRecipe };
