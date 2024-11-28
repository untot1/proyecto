const express = require('express');
const path = require('path');

const recipesRoutes = require('./routes/recipes'); // Importa las rutas de recetas

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON (si es necesario para la API)
app.use(express.json());

// Servir archivos estáticos desde la carpeta "views"
app.use(express.static(path.join(__dirname, 'views')));

// Servir imágenes estáticas desde la carpeta "images"
app.use('/images', express.static(path.join(__dirname, 'images')));

// Configurar las rutas principales de la página
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/recetas', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'pruebaRecetas.html'));
});

app.get('/subs', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'subs.html'));
});

app.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'pruebaContacto.html'));
});

// Montar las rutas de la API
app.use('/api/recipes', recipesRoutes); // Aquí montas las rutas de recetas

// Manejo de errores 404 (opcional)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
