const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');

// initialize cors
app.use(cors());
app.options('*', cors());


// middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());

// initialize api before access
const api = process.env.API_URL;


// app.use(bodyParser.json()) with app.use(express.json())


// routes
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');



app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
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
