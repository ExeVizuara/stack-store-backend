const express = require("express");
const path = require('path');
const app = express();
const cors = require("cors");
const config = require("./config.js");
const db = require("./db.js");
const uploadFile = require("./S3.js");
const router = express.Router();

app.use(cors());
app.use(express.json());

app.get("/", async (req,res) => {
    res.send('Conectado al servidor')
});

app.post("/create-almacen", async (req, res) => {
    const data = {
        name: req.body.name,
        category: req.body.category,
        code: req.body.code,
        expiration: req.body.expiration,
        stock: req.body.stock,
        cost: req.body.cost,
        discount: req.body.discount,
        price: req.body.price
    }
    console.log(data);

    await db.query('INSERT INTO productos(name, category, code, expiration, stock, cost, discount, price) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [data.name, data.category, data.code, data.expiration, data.stock, data.cost, data.discount, data.price])
        .then((data) => {
            console.log(data);
        }) 
        .catch((err) => {
        console.log(err);
        });
    });

app.get("/products", async (req, res) => {

    await db.query('SELECT * from productos')
        .then((data) => {
            console.log(data);
        }) 
        .catch((err) => {
        console.log(err);
        });
    });

app.post("/saveticket", async (req, res) => {

    console.log(req.files['file']);
    const result = await uploadFile(req.files['file']);
    console.log(result);
    res.send('Ticket guardado');

});

app.listen(config.PORT, () => {
    console.log("corriendo en puerto", config.PORT);
})