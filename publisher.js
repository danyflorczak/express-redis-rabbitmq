require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const amqp= require('amqplib');

const app = express();

async function connect(){
    try{
        const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_PORT}`);
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs", Buffer.from(msg));
        console.log(`Job sent sucessfully ${msg}`);
    }
    catch (ex){
        console.log(ex);
    }
}
let msg ;

app.use(bodyParser.json());


app.get('/', (req,res) => res.send('Hello from homepage'))

app.post('/add', (req,res) =>{
    try{
        msg = JSON.stringify(req.body);
        res.send(msg);
        connect();
    }catch(e){
        res.send("400 Bad Input");
    }
});


app.listen(process.env.PUBLISHER_PORT,() => console.log("Server running"));
