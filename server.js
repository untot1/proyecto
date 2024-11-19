const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "views" directory
app.use(express.static(path.join(__dirname, 'views')));

// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Default route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
