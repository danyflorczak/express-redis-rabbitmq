const express = require('express');
const Redis = require('redis');
const amqp =require('amqplib');

const app = express();
const redisClient = Redis.createClient();
const DEFAULT_EXPIRATION = 60;
connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost:5672"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        
        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            redisClient.set('usrInput', DEFAULT_EXPIRATION, JSON.stringify(input));
            console.log(`Recieved job with input ${JSON.stringify(input)}`);
        })

        console.log("Waiting for messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}
app.listen(4000);