"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const editProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const { userId } = req.params;
    const userData = req.body;

    const db = client.db("recipz");
    const usersCollection = db.collection("users");

    const filter = { id: userId };

    const update = {
      $set: {
        name: userData.name,
        location: userData.location,
        picture: userData.picture,
      },
    };

    const result = await usersCollection.updateOne(filter, update);

    if (result.matchedCount === 0) {
      res
        .status(404)
        .json({ status: 404, message: "User profile not found", data: null });
    } else {
      res.status(200).json({
        status: 200,
        message: "Profile updated successfully",
        data: null,
      });
    }
  } catch (err) {
    console.error("Error editing profile: ", err);
    res.status(500).json({
      status: 500,
      message: "Profile could not be edited",
      data: null,
    });
  } finally {
    client.close();
  }
};

module.exports = { editProfile };
