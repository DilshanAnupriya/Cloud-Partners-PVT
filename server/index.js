const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {mongo} = require("mongoose");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_DB;


const productRoutes = require('./Route/ProductRoute');
const userRoutes = require('./Route/userRoute');
const blogRoutes = require('./Route/blogRoute');


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
    origin: 'http://localhost:3001', // frontend URL
    credentials: true, // if you need to send cookies or auth headers
}));


app.use('/api/products', productRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/blogs', blogRoutes);

mongoose.connect(URL).then(()=>{
    console.log('MongoDB Connected!...');
}).catch(err=>{
    console.error((err));
});


app.listen(PORT,() => {
    console.log(`Server started on port: ${PORT}`);
});

module.exports = app;