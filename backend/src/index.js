import express from "express";

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("El servidor esta corriendo en el puerto 3000");
});

app.get("/", (req, res) => {
  res.send("Hola mundo");
})






