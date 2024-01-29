"use strict";

const express = require("express");
const morgan = require("morgan");
const multer = require("multer");

const { addRecipe } = require("./handlers/addRecipe");
const { addUser } = require("./handlers/AddUser");
const { getUserProfile } = require("./handlers/getUserProfile");
const { getRecipes } = require("./handlers/getRecipes");
const { deleteRecipe } = require("./handlers/deleteRecipe");
const { getSpecificRecipe } = require("./handlers/getSpecificRecipe");
const { followUser } = require("./handlers/followUser");
const { unfollowUser } = require("./handlers/unfollowUser");
const { uploadImage } = require("./handlers/uploadImage");
const { saveRecipe } = require("./handlers/saveRecipe");
const { unsaveRecipe } = require("./handlers/unsaveRecipe");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
  .post("/api/upload-image", upload.single("image"), uploadImage)
  .post("/api/users", addUser)
  .post("/api/follow/:userId", followUser)
  .post("/api/unfollow/:userId", unfollowUser)
  .post("/api/save-recipe/:recipeId", saveRecipe)
  .post("/api/unsave-recipe/:recipeId", unsaveRecipe)
  .get("/api/users/:userId", getUserProfile)
  .get("/api/all-recipes-by/:userId", getRecipes)
  .get("/api/all-recipes/:recipeId", getSpecificRecipe)
  .delete("/api/delete-recipe", deleteRecipe)
  //
  .listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });
