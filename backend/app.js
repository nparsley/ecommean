const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');



// app.use(bodyParser.json()) with app.use(express.json())

// middleware
app.use(express.json());
app.use(morgan('tiny'));

require('dotenv/config');
const api = process.env.API_URL;

// routes
app.get(`${api}/products`, (req, res, next) => {
    const product = {
        id: 1,
        name: 'hair dresser',
        image: 'some_url'
    }
    res.send(product);
})

app.post(`${api}/products`, (req, res, next) => {
    const newProduct = req.body;
    console.log(newProduct);

    res.send(newProduct);
})

// uri from mongodb cloud(connection string)
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('database connection is ready...')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(3000, () => {
    // console.log(api);
    console.log('server running http://localhost:3000');
})

// console.log('hello world');
