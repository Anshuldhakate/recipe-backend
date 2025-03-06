const axios = require("axios");
const Recipe = require("../models/Recipe");
const User = require("../models/User");

const searchRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipes" });
  }
};

const saveRecipe = async (req, res) => {
  try {
    const { userId, recipe } = req.body;
    const newRecipe = await Recipe.create(recipe);
    await User.findByIdAndUpdate(userId, { $push: { savedRecipes: newRecipe._id } });
    res.json({ message: "Recipe saved" });
  } catch (error) {
    res.status(500).json({ error: "Error saving recipe" });
  }
};

// ✅ Properly export as an object
module.exports = { searchRecipes, saveRecipe };
