const keys = require('./keys')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());


// const mongoURI = 'mongodb+srv://rp:rp123@cluster0.i9xwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoURI = `mongodb://${keys.mongoHost}:${keys.mongoPort}/library_customers`

mongoose
    .connect(mongoURI,{useNewUrlParser: true , useUnifiedTopology :  true})
    .then(() => console.log('MongoDB is Connected'))
    .catch(err => console.log(err))



const Customer = require('./Customer');


app.get('/customers',async (req,res)=>{

   
    try {
        const customers = await Customer.find({})
        console.log('sdsd')
        if(customers){
            res.json(customers);
        }else{
            res.status(404).json({message:'Customers Empty'});
        }
    }
    catch(err){
        res.json({error:err})
    }

})



app.get('/customers/:id',async (req,res)=>{

    try {
        const customer = await Customer.findById({_id:req.params.id})

        if(customer){
            res.json(customer);
        }else{
            res.status(404).json({message:'No such Customer Found'});
        }
    }
    catch(err){
        res.json({error:err})
    }
    
})



app.post("/customers",async (req,res)=>{
    let newCustomer = {
        name:req.body.name,
        age:req.body.age,
        address:req.body.address
    }
    try {

        let result  = await Customer.create(newCustomer); 
        res.status(200).json(result);
 
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }

})



app.delete("/customers/:id",async (req,res)=>{
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if(customer){
            res.status(200).json(book);
        }else{
            res.status(404).json({'msg':'No such found'})
        }
    } catch (err) {
        res.status(500).json({error:'Server Error'})
    }
});



app.listen(5555,()=>{
    console.log('Customer Service start on PORT 5555')
})
