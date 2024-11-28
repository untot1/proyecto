// Obtener todas las recetas desde la API
export async function fetchRecipes() {
    try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
            throw new Error('Error al obtener las recetas.');
        }
        const data = await response.json();
        return data; // Devuelve las recetas como un array
    } catch (error) {
        console.error('Error en fetchRecipes:', error);
        return [];
    }
}

// Obtener una receta por ID
export async function fetchRecipeById(id) {
    try {
        const response = await fetch(`/api/recipes/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la receta.');
        }
        const data = await response.json();
        return data; // Devuelve la receta específica
    } catch (error) {
        console.error(`Error en fetchRecipeById(${id}):`, error);
        return null;
    }
}

// Agregar una nueva receta
export async function addRecipe(recipe) {
    try {
        const response = await fetch('/api/recipes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipe),
        });
        if (!response.ok) {
            throw new Error('Error al agregar la receta.');
        }
        const data = await response.json();
        return data; // Devuelve la receta recién creada
    } catch (error) {
        console.error('Error en addRecipe:', error);
        return null;
    }
}

// Actualizar una receta existente
export async function updateRecipe(id, updatedRecipe) {
    try {
        const response = await fetch(`/api/recipes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedRecipe),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la receta.');
        }
        const data = await response.json();
        return data; // Devuelve la receta actualizada
    } catch (error) {
        console.error(`Error en updateRecipe(${id}):`, error);
        return null;
    }
}

// Eliminar una receta
export async function deleteRecipe(id) {
    try {
        const response = await fetch(`/api/recipes/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la receta.');
        }
        const data = await response.json();
        return data; // Devuelve la receta eliminada
    } catch (error) {
        console.error(`Error en deleteRecipe(${id}):`, error);
        return null;
    }
}
