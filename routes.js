// routes.js opzetten
const express = require("express");

// Router, een module waarmee je routes kunt organiseren en beheren.
const router = express.Router();
const data = require("./credentials.json");

// Homepage route
router.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

// About route
router.get("/about", (req, res) => {
  res.send("<h1>About me</h1>");
});

// Welkomstpagina route
router.get("/welkomst/:username", (req, res) => {
  const username = req.params.username;
  res.send(
    `<h1>Welkom pagina</h1>, <p>welkom ${username}, bij mijn node site</p>`
  );
});

// Movie route
router.get("/movie", (req, res) => {
  let movie = {
    title: "The Shawshank Redemption",
    description:
      "Andy Dufresne is a young and successful banker convicted of murdering his wife.",
  };
  res.render("detail.ejs", { data: movie });
});

// Inlogformulier weergeven
router.get("/inlogweergeven", showAddForm);
// Inlogformulier verwerken
router.post("/welkom", handleAddForm);

function showAddForm(req, res) {
  res.render("login.ejs");
}

function handleAddForm(req, res) {
  const formUsername = req.body.username;
  const formPassword = req.body.password;

  const user = data.users.find(
    (registeredUser) => registeredUser.username === formUsername
  );
  if (user && user.password === formPassword) {
    res.render("welkom.ejs", { username: formUsername });
  } else {
    res.render("login.ejs", { error: "Incorrect password" });
  }
}

module.exports = router;
