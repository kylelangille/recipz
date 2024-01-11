"use strict";

const express = require("express");
const morgan = require("morgan");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const { addRecipe } = require("./handlers/addRecipe");

const PORT = 4000;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: "http://localhost:4000",
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

express()
  .use(function (req, res, next) {
    res.header(
      "Acess-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Acess-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  // REST ENDPOINTS GO HERE:
  .post("/add-recipe", checkJwt, addRecipe)
  //
  .listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });
