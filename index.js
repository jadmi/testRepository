const express = require("express");
const app = express();


// Serve static files from the "static" directory
app.use("/static", express.static("static"));
// homepage route
app.get("/", handleHome);
app.get("/about", handleAbout)
app.get("/welkomst/:username", handleWelkom);

// error invalid route
app.use((req, res) => {
  res.status(404).send("<h1>Error 404</h1><p>Page not found!</p>");
});

app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});


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
