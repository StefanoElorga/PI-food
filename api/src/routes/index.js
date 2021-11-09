const express = require("express");
const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require("./recipes");
const dietsRouter = require("./diets");

const router = Router();

router.use(express.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipesRouter);
router.use("/diets", dietsRouter);

module.exports = router;
