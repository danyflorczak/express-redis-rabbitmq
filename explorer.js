require('dotenv').config();
const express = require('express');
const Redis = require('redis');
const app = express();
let dbSize;
const redisClient = Redis.createClient({
    socket: {
        host: `${process.env.HOST}`,
        port: process.env.REDIS_PORT
    }
});
redisClient.connect();
redisClient.sendCommand(["keys","*"]).then(function(result){
    console.log(result.length);
    dbSize = result.length;
});


app.get('/size', (req,res)=>{
    res.send(`db size is ${dbSize}`);
});
app.listen(process.env.EXPLORER_PORT,() => console.log("Server running"));