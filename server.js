require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/html'));

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on port ${port}`))