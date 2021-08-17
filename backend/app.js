const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

// const Product = require('./models/product');

// initialize api before access
require('dotenv/config');
const api = process.env.API_URL;


// app.use(bodyParser.json()) with app.use(express.json())

// middleware
app.use(express.json());
app.use(morgan('tiny'));

// routers
const productsRouter = require('./routers/products');
app.use(`${api}/products`, productsRouter)







// uri from mongodb cloud(connection string)
mongoose.connect(/* process.env.CONNECTION_STRING, */ process.env.CONNECTION_STRING2, { useNewUrlParser: true, useUnifiedTopology: true})
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
