const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./model(s)/customer');
const cors = require('cors');

const app = express();
mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

// const customer = [
//     {
//         name:"Chanon Sritulakan",
//         industry: ""
//     },
//     {
//         name:"Wanwisa Channak",
//         industry: ""
//     }
// ];

// const customer = new Customer({
//     name: 'Chanon Sritulakan',
//     industry: 'Education'
// });
// customer.save();

app.get('/',(req,res)=>{
    res.send(customer);
});

app.get('/api/customer/:id', async(req,res)=>{
    console.log({
        requestParams: req.params,
        RequestQuery: req.query
    });
    try{
        const {id: customerId} = req.params;
        console.log(customerId);
        const customer = await Customer.findById(customerId);
        console.log(customer);
        if(!customer){
            res.status(404).json({error: 'User not found!'})
        }else{
        res.json({customer});
        }
    } catch(e){
        res.status(500).json({error: 'somthing went wrong!'})
    }
});

app.put('/api/customer/:id', async (req,res) => {
    const customerId = req.params.id;
    const result = await Customer.replaceOne({_id: customerId}, req.body)
    console.log(result);
    res.json({updatedCount: result.modifiedCount});
});

app.post('/',(req,res)=>{
    res.send('post request');
});

app.post('/api/customer', async (req,res)=>{
    console.log(res.body);
    const customer = new Customer({
        name: req.body.name,
        industry: req.body.industry
    });

    try{
        await customer.save();
        res.status(201).json({customer: customer});
    }catch(e){
        res.status(400).json({error: e.message});
    }
});



const start = async() => {
    try{
        await mongoose.connect(CONNECTION);
        
        app.listen(PORT, () => {
            console.log('App listening on port '+PORT)
        });
    } catch(e){
        console.log(e.message)
    }
};

start();

