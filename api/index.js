const express = require('express')
const cors = require('cors')
const Transaction = require('./models/Transaction');
const mongoose = require("mongoose");
require('dotenv').config();
const app= express();


app.use(cors());
app.use(express.json());
app.get('/api/test',(req,res )=>{
    res.json('test okdd');
});

app.post('/api/transaction',async (req,res)=>{
   // console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    const {name,description,datetime,price,category} = req.body;
    const transaction = await Transaction.create({name,description,datetime,price,category});
    res.json(transaction);
});

app.get('/api/transactions',async (req,res)=>{
     await mongoose.connect(process.env.MONGO_URL);
     const transactions = await Transaction.find();
     res.json(transactions);
 });
 


app.listen(4040, () => {
    console.log('Server running on port 4040');
});