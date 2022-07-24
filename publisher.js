import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';
import amqp from 'amqplib';

const app = express();
const PORT = 5000;

async function connect(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs", Buffer.from(msg));
        console.log(`Job sent sucessfully ${msg}`)
    }
    catch (ex){
        console.log(ex);
    }
}
let msg ;

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req,res) => res.send('Hello from homepage'))

app.post('/', (req,res) =>{
    try{
        msg = JSON.stringify(req.body);
        res.send(msg);
        connect();
    }catch(e){
        res.send("400 Bad Input");
    }
});


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))
