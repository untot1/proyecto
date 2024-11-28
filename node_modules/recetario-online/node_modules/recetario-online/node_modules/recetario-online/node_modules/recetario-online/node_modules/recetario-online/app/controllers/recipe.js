const fs = require('fs');
const path = require('path');

const recipesFilePath = path.join(__dirname, '../../data/recipes.json');

// Leer recetas desde el archivo JSON
function getRecipes() {
  const data = fs.readFileSync(recipesFilePath, 'utf8');
  return JSON.parse(data);
}

// Guardar recetas en el archivo JSON
function saveRecipes(recipes) {
  fs.writeFileSync(recipesFilePath, JSON.stringify(recipes, null, 2), 'utf8');
}

// Obtener todas las recetas
exports.getAllRecipes = (req, res) => {
  try {
    const recipes = getRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error al leer las recetas' });
  }
};

// Obtener una receta por ID
exports.getRecipeById = (req, res) => {
  try {
      const recipes = getRecipes(); // Obtén todas las recetas
      const recipe = recipes.find(r => r.id === parseInt(req.params.id)); // Busca por ID
      if (!recipe) {
          return res.status(404).json({ message: 'Receta no encontrada' });
      }
      res.json(recipe); // Devuelve la receta encontrada
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener la receta' });
  }
};

// Agregar una nueva receta
exports.addRecipe = (req, res) => {
  try {
    const recipes = getRecipes();
    const newRecipe = { id: recipes.length + 1, ...req.body }; // Usar número como ID
    recipes.push(newRecipe);
    saveRecipes(recipes);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar la receta' });
  }
};

// Actualizar una receta existente
exports.updateRecipe = (req, res) => {
  try {
    const recipes = getRecipes();
    const recipeIndex = recipes.findIndex(r => r.id === parseInt(req.params.id, 10)); // Convertir a número
    if (recipeIndex === -1) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    recipes[recipeIndex] = { ...recipes[recipeIndex], ...req.body };
    saveRecipes(recipes);
    res.json(recipes[recipeIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la receta' });
  }
};

// Eliminar una receta
exports.deleteRecipe = (req, res) => {
  try {
    let recipes = getRecipes();
    const recipeIndex = recipes.findIndex(r => r.id === parseInt(req.params.id, 10)); // Convertir a número
    if (recipeIndex === -1) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    const deletedRecipe = recipes.splice(recipeIndex, 1);
    saveRecipes(recipes);
    res.json(deletedRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la receta' });
  }
};
