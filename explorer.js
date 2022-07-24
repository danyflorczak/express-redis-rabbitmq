const express = require('express');
const Redis = require('redis');
const app = express();
const redisClient = Redis.createClient();
redisClient.connect();
const PORT = 6000;
redisClient.sendCommand(["keys","*"]).then(function(result){
    console.log(result.length);
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
