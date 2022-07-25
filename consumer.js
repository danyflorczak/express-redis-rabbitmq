require('dotenv').config();
const express = require('express');
const Redis = require('redis');
const amqp =require('amqplib');

const app = express();
const redisClient = Redis.createClient({
    socket: {
        host: `${process.env.HOST}`,
        port: process.env.REDIS_PORT
    }
});
redisClient.connect();
const DEFAULT_EXPIRATION = 60;

connect();
async function connect() {

    try {
        const amqpServer = `amqp://${process.env.RABBITMQ_PORT}`;
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        
        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            redisClient.setEx((+ new Date()).toString(), DEFAULT_EXPIRATION, JSON.stringify(input));
            console.log(`Recieved job with input ${JSON.stringify(input)}`);
        })

        console.log("Waiting for messages...");
    
    }
    catch (ex){
        console.error(ex);
    }

}
app.listen(process.env.CONSUMER_PORT,() => console.log("Server running"));