const express = require("express");
const app = express();

// homepage route
app.get("/", handleHome);
app.get("/about", handleAbout).listen(8000);
app.get("/welkomst/:username", handleWelkom);

app.use("/static", express.static("static"));

function handleHome(req, res) {
  res.send("<h1>Hello world!</h1>");
}

function handleAbout(req, res) {
  res.send("<h1>About me</h1>");
}

function handleWelkoM(req, res) {
  const username = req.params.username;
  res.send(`<h1>Welkom pagina</h1>, <p>welkom 
    ${username}, bij mijn node site</p>`);
}
