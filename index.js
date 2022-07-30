const express = require("express");
const app = express();
const port = 3000;
const users = require("./routes/users");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.get("/", (req, res) => {
  res.json({ message: "Nothing Available here" });
});


app.use("/users", users);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});


app.listen(port, () => {
  console.log(`Use the api at http://localhost:${port}`);
});



