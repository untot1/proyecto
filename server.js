const express = require('express');
const path = require('path');
const session = require('express-session');
const recipesRoutes = require('./routes/recipes'); // Importa las rutas de recetas

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON (si es necesario para la API)
app.use(express.json());

// Middleware para procesar datos del formulario
app.use(express.urlencoded({ extended: true }));

// Configurar express-session
app.use(session({
    secret: 'mi_secreto_seguro', // Cambia esto por una clave más fuerte
    resave: false,
    saveUninitialized: true
}));

// Middleware para verificar si la sesión está iniciada
function verificarSesion(req, res, next) {
    if (req.session.user) {
        next(); // Continuar si la sesión está activa
    } else {
        res.redirect('/subs'); // Redirigir a la página de suscripción si no hay sesión
    }
}

// Servir archivos estáticos desde la carpeta "views"
app.use(express.static(path.join(__dirname, 'views')));

// Configurar las rutas principales de la página
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Rutas protegidas
app.get('/recetas', verificarSesion, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'pruebaRecetas.html'));
});

app.get('/perfil', verificarSesion, (req, res) => {
    const user = req.session.user;
    res.send(`Hola ${user.name}, tu correo es ${user.email} y tus preferencias son: ${user.preferences}`);
});

// Rutas públicas
app.get('/subs', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'subs.html'));
});

app.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'pruebaContacto.html'));
});

// Montar las rutas de la API
app.use('/api/recipes', recipesRoutes); // Aquí montas las rutas de recetas

// Ruta para manejar la suscripción
app.post('/suscribirse', (req, res) => {
  const { name, email, preferences } = req.body;

  // Guardar datos en la sesión
  req.session.user = { name, email, preferences };

  // Redirigir a la página de recetas
  res.redirect('/recetas');
});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
        return res.send('Error al cerrar sesión');
    }
    res.redirect('/'); // Redirigir al inicio
  });
});

// Manejo de errores 404 (opcional)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
