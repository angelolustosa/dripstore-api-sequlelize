import express from "express"
import cors from "express"
import { routerProduto } from "./routes/produto.routes.js";
import db from "./models/index.js";
import { routerCategoria } from "./routes/categoria.routes.js";
import os from "os";

const app = express();

/* var corsOptions = {
    origin: "http://localhost:5173"
}; */

//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


db.sequelize.sync(/* { force: true } */)
    .then(() => {
        console.log("Drop and re-sync db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Servidor no rodando!" });
});

routerProduto(app);
routerCategoria(app);

// set port, listen for requests
//const HOST = 'localhost';
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://${os.hostname()}:${PORT}.`);
});