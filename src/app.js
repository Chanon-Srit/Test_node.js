const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customers');

const app = express();
mongoose.set('strictQuery', false);

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
//         age: "22"
//     },
//     {
//         name:"Wanwisa Channak",
//         age: "21"
//     }
// ];

const customer = new Customer({
    name: 'Chanon Sritulakan',
    age: '22'
});

app.get('/',(req,res)=>{
    res.send(customer);
});

app.get('/api/customer',(req,res)=>{
    res.send({"data":customer});
});

app.get('/api/customer/name',(req,res)=>{
    res.send({"data":customer.name});
});

app.post('/',(req,res)=>{
    res.send('post request');
});

app.post('/api/customer',(req,res)=>{
    console.log(res.body);
    res.send(res.body);
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