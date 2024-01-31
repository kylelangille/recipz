"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const editRecipe = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const { recipeId } = req.params;
    const editedData = req.body;

    const db = client.db("recipz");
    const recipeCollection = db.collection("recipes");

    const result = await recipeCollection.updateOne(
      { _id: recipeId },
      { $set: { formData: editedData } },
      { returnDocument: "after" }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Recipe not found", data: null });
    }

    res.status(200).json({
      status: 200,
      message: "Recipe updated successfully",
      data: null,
    });
  } catch (err) {
    console.error("Error editing recipe: ", err);
    res
      .status(500)
      .json({ status: 500, message: "something went wrong", data: null });
  } finally {
    client.close();
  }
};

module.exports = { editRecipe };
