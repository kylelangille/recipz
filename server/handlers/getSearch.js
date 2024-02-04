"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const getSearch = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const query = req.query.q;

    const db = client.db("recipz");
    const recipesCollection = db.collection("recipes");

    const results = await recipesCollection.find({
      $or: [
        { "formData.recipeName": { $regex: new RegExp(query, "i") } },
        {
          "formData.ingredients.ingredient": { $regex: new RegExp(query, "i") },
        },
        { "formData.tags": { $regex: new RegExp(query, "i") } },
      ],
    });

    const resultsArray = await results.toArray();

    if (resultsArray.length === 0) {
      res.status(404).json({
        status: 404,
        message: "Results could not be found",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "database queried successfully",
      data: resultsArray,
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

module.exports = { getSearch };
