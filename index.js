const express = require("express");
const app = express();
// views inladen
app.set("view engine", "ejs");
app.set("views", "./views");

// static files opserveren
app.use("/static", express.static("static"));

// form data parsen
app.use(express.urlencoded({ extended: true }));

app.get("/inlogweergeven", showAddForm);
app.post("/inlog", handleAddForm);

// homepage route
app.get("/", handleHome);
app.get("/about", handleAbout);
app.get("/welkomst/:username", handleWelkom);
app.get("/movie", movieFunction);

// error invalid route
app.use((req, res) => {
  res.status(404).send("<h1>Error 404</h1><p>Page not found!</p>");
});

app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});

function movieFunction(req, res) {
  // Define the movie object
  let movie = {
    title: "The Shawshank Redemption",
    description:
      "Andy Dufresne is a young and successful banker convicted of murdering his wife.",
  };
  // Render the 'detail.ejs' template with the movie data
  res.render("detail.ejs", { data: movie });
}

function handleHome(req, res) {
  res.send("<h1>Hello world!</h1>");
}

function handleAbout(req, res) {
  res.send("<h1>About me</h1>");
}

function handleWelkom(req, res) {
  const username = req.params.username;
  res.send(`<h1>Welkom pagina</h1>, <p>welkom 
    ${username}, bij mijn node site</p>`);
}

function showAddForm(req, res) {
  res.render("login.ejs");
}

function handleAddForm(req, res) {
  res.send(`Formulier ontvangen, dank voor het inloggen met de gegevens:
    username: ${req.body.username} en password: ${req.body.password}`);
}
