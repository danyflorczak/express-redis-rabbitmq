const express = require('express');
const Redis = require('redis');
const app = express();
let dbSize;
const redisClient = Redis.createClient();
redisClient.connect();
const PORT = 3000;
redisClient.sendCommand(["keys","*"]).then(function(result){
    console.log(result.length);
    dbSize = result.length;
});


app.get('/size', (req,res)=>{
    res.send(`db size is ${dbSize}`);
});
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
