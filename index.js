const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

const app = express();

require('dotenv').config();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.get('/', (req,res) => {
    res.send('Hello world!')
});

app.get('/about', (req, res) => {
    res.send('About me! NGA!')
})

app.get('/portfolio', (req,res) => {
    res.send('On going projects!')
})

app.get('/contact', (req,res) =>{
    res.send('How to reach me!')
})

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

