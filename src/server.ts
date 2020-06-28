import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Typescript");
});

app.listen(3000, () => {
  console.log("App is started on port 3000!");
});
