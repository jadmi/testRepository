const express = require("express");
const app = express();
require("./db"); // Database connectie
const routes = require("./routes"); // Routes importeren

// Server configuratie
// views inladen
app.set("view engine", "ejs");
app.set("views", "./views");

// static files opserveren
app.use("/static", express.static("static"));

// form data parsen/lezen
app.use(express.urlencoded({ extended: true }));

// Gebruik routes van routes.js
app.use("/", routes);

// Start de server
app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});

// 404 Error voor alle andere routes/foute routes
app.use((req, res) => {
  res.status(404).send("<h1>Error 404</h1><p>Page not found!</p>");
});
