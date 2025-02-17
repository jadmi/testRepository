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

// Test de functie
createUser("Justin", "justin@gmail.com", "hashed_password");
