const express = require('express');
const recipeController = require('../app/controllers/recipe');

const router = express.Router();

// Todas las rutas están en el controlador
router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.post('/', recipeController.addRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
