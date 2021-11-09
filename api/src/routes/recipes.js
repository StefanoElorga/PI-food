const express = require("express");
const router = express.Router();
const axios = require("axios");
const { response } = require("express");
const { Recipe, Diets } = require("../db");
const { API_KEY } = process.env;
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      const recipesApi = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
      );
      const information = await recipesApi.data.results.map((a) => {
        return {
          id: a.id,
          title: a.title,
          diets: a.diets,
          image: a.image,
          dishType: a.dishType,
          summary: a.summary,
          healthScore: a.healthScore,
          cuisines: a.cuisines,
          spoonacularScore: a.spoonacularScore,
        };
      });

      const recipesDB = await Recipe.findAll({
        include: {
          model: Diets,
        },
      });

      const allRecipes = information.concat(recipesDB);

      return res.status(200).send(allRecipes);
    }
    if (name) {
      const recipeByName = await Recipe.findAll({
        include: {
          model: Diets,
        },
      });
      let infoRecipes = await recipeByName.filter((r) =>
        r.title.includes(name)
      );
      const recipeByNameApi = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true `
      );
      const recipeApi = await recipeByNameApi.data.results.filter((r) =>
        r.title.includes(name)
      );
      let recipesAll = recipeApi.concat(infoRecipes);
      return res.status(200).send(recipesAll);
    }
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id.length > 16) {
    let infoRecipeDB = (
      await Recipe.findOne({
        where: {
          id: id,
        },
        include: [Diets],
      })
    ).toJSON();
    let diets = await infoRecipeDB.diets.map((d) => d.name);
    infoRecipeDB = {
      ...infoRecipeDB,
      diets,
    };
    console.log(infoRecipeDB);
    return infoRecipeDB
      ? res.send(infoRecipeDB)
      : res.status(404).send("id not found");
  }
  if (id.length < 15) {
    const infoRecipeApi = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}&addRecipeInformation=true`
    );
    const infoAll = {
      title: infoRecipeApi.data.title,
      image: infoRecipeApi.data.image,
      id: infoRecipeApi.data.id,
      diets: infoRecipeApi.data.diets,
      dishType: infoRecipeApi.data.dishTypes,
      healthScore: infoRecipeApi.data.healthScore,
      summary: infoRecipeApi.data.summary,
      cuisines: infoRecipeApi.data.cuisines,
      extendedIngredients: infoRecipeApi.data.extendedIngredients,
      analyzedInstructions: infoRecipeApi.data.analyzedInstructions,
      spoonacularScore: infoRecipeApi.data.spoonacularScore,
    };
    return infoAll
      ? res.status(200).send(infoAll)
      : res.status(404).send("id not found");
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      diets,
      summary,
      dishType,
      image,
      spoonacularScore,
      healthScore,
      instructions,
      steps,
    } = req.body;

    if (!title) {
      return res.status(404).send("please enter a name.");
    }
    let createRecipe = await Recipe.create({
      title: title,
      summary: summary,
      dishType: dishType,
      steps: steps,
      image: image,
      spoonacularScore: spoonacularScore,
      healthScore: healthScore,
      instructions: instructions,
    });
    // let dietsDB = await Diets.findAll({
    //   where: {
    //     name: diets,
    //   },
    // });

    await createRecipe.addDiets(diets);
    res.send(createRecipe);
  } catch (error) {
    res.status(404).json({ mesage: "error" });
  }
});

module.exports = router;
