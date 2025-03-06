const express = require("express");
const { searchRecipes, saveRecipe } = require("../controllers/recipeController");
const router = express.Router();

router.get("/search", searchRecipes);
router.post("/save", saveRecipe);

module.exports = router;
