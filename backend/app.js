const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.send('hello api')
})

app.listen(3000, () => {
    console.log('server running http://localhost:3000');
})

// console.log('hello world');
