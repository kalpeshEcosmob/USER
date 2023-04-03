const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");

const userRoutes = require("./routes/user.route");

const app = express();
app.use(CORS());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("uploads"));
app.options("*", CORS());

const PORT = 3001;

app.use(CORS(), userRoutes);

app.use((error, req, res, next) => {
  console.log("Error", error);
  res
    .status(500)
    .json({ Error: "Invalid Request", message: "Please check your url" });
});

app.listen(PORT, () => {
  console.log(`Running at port ${PORT}`);
});
