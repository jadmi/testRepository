require("dotenv").config();
const express = require("express");
const app = express();
const data = require("./credentials.json");

// Use MongoDB
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// Construct URL used to connect to database from info in the .env file
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Try to open a database connection
client
  .connect()
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log(`Database connection error - ${err}`);
    console.log(`For uri - ${uri}`);
  });

// views inladen
app.set("view engine", "ejs");
app.set("views", "./views");

// static files opserveren
app.use("/static", express.static("static"));

// form data parsen
app.use(express.urlencoded({ extended: true }));

app.get("/inlogweergeven", showAddForm);
app.post("/welkom", handleAddForm);

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
  // om als strings te weergeven in de response
  const formUsername = req.body.username;
  const formPassword = req.body.password;

  // checken of de gegevens overeenkomen van de form data met de userdata al opgeslagen in het json bestand
  const user = data.users.find(
    (registeredUser) => registeredUser.username === formUsername
  );
  if (user && user.password === formPassword) {
    res.render("welkom.ejs", { username: formUsername });
  } else {
    res.render("login.ejs", { error: "Incorrect password" });
  }
}
