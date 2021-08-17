const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');


// initialize api before access
require('dotenv/config');
const api = process.env.API_URL;


// app.use(bodyParser.json()) with app.use(express.json())

// middleware
app.use(express.json());
app.use(morgan('tiny'));

// routes
const productsRouter = require('./routers/products');
app.use(`${api}/products`, productsRouter);

const categoriesRouter = require('./routers/categories');
app.use(`${api}/categories`, categoriesRouter);

const ordersRouter = require('./routers/prders');
app.use(`${api}/orders`, ordersRouter);

const usersRouter = require('./routers/users');
app.use(`${api}/users`, usersRouter);





// database
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
