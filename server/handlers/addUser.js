"use strict";

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const MONGO_URI = process.env.MONGO_URI;

const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const userData = req.body;

    const db = client.db("recipz");
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({
      $or: [{ email: userData.email }, { id: userData.id }],
    });

    if (existingUser) {
      res.status(200).json({
        status: 200,
        message: "User retrived successfully",
        data: existingUser,
      });
    } else {
      userData._id = uuidv4();
      await usersCollection.insertOne(userData);
      res.status(200).json({
        status: 200,
        message: "User added successfully",
        data: userData,
      });
    }
  } catch (err) {
    console.error("Error: ", err);
    res
      .status(500)
      .json({ status: 500, message: "failed to add user", data: null });
  } finally {
    client.close();
  }
};

module.exports = { addUser };
