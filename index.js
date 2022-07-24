import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';

const amqp = require("amqlib");

const app = express();
const PORT = 5000;

let msg;

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req,res) => res.send('Hello from homepage'))

app.post('/', (req,res) =>{
    try{
        msg = JSON.stringify(req.body);
        res.send(msg);
    }catch(e){
        res.send("400 Bad Input");
    }
});


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))
