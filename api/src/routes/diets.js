const express = require("express");
const router = express.Router();
const axios = require("axios");
const { response } = require("express");
const { Recipe, Diets } = require("../db");
const { API_KEY } = process.env;
router.use(express.json());

router.get("/", async (req, res) => {
  const diets = await Diets.findAll();
  res.send(diets);
});

module.exports = router;
