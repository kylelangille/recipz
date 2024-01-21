"use strict";

const { MongoClient } = require("mongodb");
const MONGO_URI = process.env.MONGO_URI;

const deleteRecipe = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const db = client.db("recipz");
    const recipeCollection = db.collection("recipes");
    const usersCollection = db.collection("users");

    const { _id: recipeId, userId } = req.body;

    const deleteRecipeResult = await recipeCollection.deleteOne({
      _id: recipeId,
    });

    if (deleteRecipeResult.deletedCount === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Recipe not found", data: null });
    }

    await usersCollection.updateOne(
      { id: userId },
      { $pull: { recipes: recipeId } }
    );

    res.status(200).json({
      status: 200,
      message: "Recipe deleted successfully",
      data: null,
    });
  } catch (err) {
    console.error("Error: ", err);
    res
      .status(500)
      .json({ status: 500, message: "Failed to delete recipe", data: null });
  } finally {
    client.close();
  }
};

module.exports = { deleteRecipe };
