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

require("dotenv").config();

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

// Set up database and collection
const db = client.db(process.env.DB_NAME);
const collection = db.collection(process.env.DB_COLLECTION);

async function listAllUsers() {
  try {
    const users = await collection.find().toArray();
    console.log("Gebruikers:", users);
  } catch (error) {
    console.error("Fout bij het ophalen van gebruikers:", error);
  }
}

async function createUser(name, email, password) {
  try {
    const result = await collection.insertOne({ name, email, password });
    console.log(`Gebruiker toegevoegd met _id: ${result.insertedId}`);
  } catch (err) {
    console.error("Fout bij toevoegen gebruiker:", err);
  }
}

async function handleAddForm(req, res) {
  const formUsername = req.body.username;
  const formPassword = req.body.password;
  const formEmail = req.body.email;

  try {
    const user = await collection.findOne({ name: formUsername });
    console.log("User found:", user); // Debugging

    if (user && user.password === formPassword && user.email === formEmail) {
      console.log("Login successful"); // Debugging
      res.render("welkom.ejs", { name: formUsername });
    } else {
      console.log("Login failed"); // Debugging
      res.render("login.ejs", { error: "Incorrect password" });
    }
  } catch (err) {
    console.error("Fout bij het ophalen van gebruiker:", err);
  }
}


// Register weergeven
router.get("/register", (req, res) => {
  res.render("register.ejs");
});


async function handleRegister(req, res) {
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const nieuweGebruiker = await collection.insertOne({name, email, password})
    if(nieuweGebruiker) {
      res.redirect('welkomTwee.ejs')
      console.log("checkdb")
    }
  } catch (err) {
    console.error("Fout bij het toevoegen van gebruiker:", err);
  }

}



router.post("/welkomTwee", handleRegister);



module.exports = router;
