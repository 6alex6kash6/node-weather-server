const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geocode, forecast } = require("./utils");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get("", (req, res) =>
  res.render("index", {
    title: "Weather title",
    name: "Alex Kash",
  })
);

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Alex Kash",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help message",
    title: "Help",
    name: "Alex Kash",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "error",
    });
  }
  const { address } = req.query;
  geocode(address, (error, data) => {
    if (error) {
      return res.send({
        error: "error",
      });
    }
    const { longitude, latitude, location } = data;

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: "error",
        });
      }
      res.send({
        forecastData,
        location,
      });
    });
  });

  // res.send({ temprature: "20 deg", location: "Minsk" });
});

app.get("/prods", (req, res) => {
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "About me",
    name: "Alex Kash",
    error: "article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "About me",
    name: "Alex Kash",
    error: "page not found",
  });
});
app.listen(8080, () => console.log(`Example app listening on port port 8080!`));
