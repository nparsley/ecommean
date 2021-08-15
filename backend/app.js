const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');



// app.use(bodyParser.json()) with app.use(express.json())

// middleware
app.use(express.json());
app.use(morgan('tiny'));

// schema
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    // countInStock: Number
    countInStock: {
        type: Number,
        required: true
    }
})

// model
const Product = mongoose.model('Product', productSchema);


require('dotenv/config');
const api = process.env.API_URL;

// routes
app.get(`${api}/products`, async (req, res, next) => {
    // const product = {
    //     id: 1,
    //     name: 'hair dresser',
    //     image: 'some_url'
    // }
    const productList = await Product.find();

    if (!productList) {
        res.status(500).json({success: false})
    }

    res.send(productList);

    // res.send(product);
})

app.post(`${api}/products`, (req, res, next) => {
    // const newProduct = req.body;
    // console.log(newProduct);
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    product.save().then((createdProduct) => {
        res.status(201).json(createdProduct)
    }).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
    // res.send(newProduct);
})

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
