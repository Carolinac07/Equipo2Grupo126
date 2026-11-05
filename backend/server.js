const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const computadoras = require("./routes/computadoras");
const usuarios = require("./routes/usuarios");
const reservas = require("./routes/reservas");

app.use("/api/computadoras", computadoras);
app.use("/api/usuarios", usuarios);
app.use("/api/reservas", reservas);

app.get("/", (req, res) => {
    res.send("Backend funcionando correctamente");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor funcionando en el puerto " + PORT);
});