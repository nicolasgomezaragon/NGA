const express = require('express');
const app = express();
const port = 3000;

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

