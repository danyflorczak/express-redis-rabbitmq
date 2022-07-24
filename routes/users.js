import express from 'express';

const router = express.Router();

const users = [
    {
    firstName: "John",
    lastName: "Doe",
    age: 25,
    },
    {
        fristName: "Jane",
        lastName: "Smith",
        age: 24
    }
]


router.get('/', (req,res) =>{
    res.send(users)
});

router.post('/', (req,res)=>{
    const user = req.body;
    users.push(user);
    res.send('user');
} );

export default router;