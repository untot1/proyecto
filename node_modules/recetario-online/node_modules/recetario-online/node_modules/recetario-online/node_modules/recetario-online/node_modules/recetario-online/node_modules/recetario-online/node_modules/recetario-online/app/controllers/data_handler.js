const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../data/recipes.json');

const readRecipes = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const writeRecipes = (recipes) => fs.writeFileSync(dataPath, JSON.stringify(recipes, null, 2));

module.exports = {
  getAllRecipes: () => readRecipes(),
  getRecipeById: (id) => readRecipes().find(recipe => recipe.id === id),
  addRecipe: (newRecipe) => {
    const recipes = readRecipes();
    recipes.push(newRecipe);
    writeRecipes(recipes);
  },
  updateRecipe: (id, updatedFields) => {
    const recipes = readRecipes();
    const index = recipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) {
      recipes[index] = { ...recipes[index], ...updatedFields };
      writeRecipes(recipes);
    }
  },
  deleteRecipe: (id) => {
    const recipes = readRecipes().filter(recipe => recipe.id !== id);
    writeRecipes(recipes);
  }
};
