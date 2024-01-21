"use strict";

const express = require("express");
const morgan = require("morgan");

const { addRecipe } = require("./handlers/addRecipe");
const { addUser } = require("./handlers/AddUser");
const { getUserProfile } = require("./handlers/getUserProfile");
const { getRecipes } = require("./handlers/getRecipes");
const { deleteRecipe } = require("./handlers/deleteRecipe");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .post("/api/add-recipe", addRecipe)
  .post("/api/users", addUser)
  .get("/api/users/:userId", getUserProfile)
  .get("/api/all-recipes-by/:userId", getRecipes)
  .delete("/api/delete-recipe", deleteRecipe)
  //
  .listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });
