const server = require('express')(); //execute here
const axios = require('axios');

// const {databaseFunction } = require('./database');


server.get('/', async(req, res) => {
    console.log("main router")
    //const result = await axios.get('http://localhost:4000/db');
    res.send(result.data); 
})
.get('/testroute', (_, res) => {
    res.send("different message");
});

server.listen(3000, () => {
    console.log("main service");
})

