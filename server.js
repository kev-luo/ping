require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pings_db", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('connected to db');
})

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/html'));

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on port ${port}`))