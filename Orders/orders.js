const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const axios = require('axios');

const app = express();
app.use(bodyParser.json());


const mongoURI = 'mongodb+srv://rp:rp123@cluster0.i9xwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


mongoose
    .connect(mongoURI,{useNewUrlParser: true , useUnifiedTopology :  true})
    .then(() => console.log('MongoDB is Connected'))
    .catch(err => console.log(err))

const Order = require('./Order');





app.get('/orders',async (req,res)=>{

   
    try {
        const orders = await Order.find({})
        if(orders){
            res.json(orders);
        }else{
            res.status(404).json({message:'Orders Empty'});
        }
    }
    catch(err){
        res.json({error:err})
    }

})



app.get('/orders/:id',async (req,res)=>{

    try {
        const order = await Order.findById({_id:req.params.id})

        if(order){

            axios.get('http://localhost:5555/customers/' +order.customerId)
            .then(resCustomer=>{

                axios.get('http://localhost:4545/books/' +order.bookId)
                .then(resBook=>{

                    let authorObj = {
                        customerName : resCustomer.data.name,
                        bookTitle:resBook.data.title,
                        initialDate:order.initialDate,
                        deliveryDate:order.deliveryDate
                    }
                   console.log(authorObj)
                   res.json(authorObj);
                })

            })
            
        }else{
            res.status(404).json({message:'No such Order Found'});
        }
    }
    catch(err){
        res.json({error:err})
    }
    
})



app.post("/orders",async (req,res)=>{
    let newOrder = {
        customerId:mongoose.Types.ObjectId(req.body.customerId),
        bookId:mongoose.Types.ObjectId(req.body.bookId),
        initialDate:req.body.initialDate,
        deliveryDate:req.body.deliveryDate
    }
    try {

        let result  = await Order.create(newOrder); 
        res.status(200).json(result);
 
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }

})



app.delete("/orders/:id",async (req,res)=>{
    try {
        const orders = await Order.findByIdAndDelete(req.params.id);

        if(orders){
            res.status(200).json(orders);
        }else{
            res.status(404).json({'msg':'No such found'})
        }
    } catch (err) {
        res.status(500).json({error:'Server Error'})
    }
});





app.listen(6565,()=>{
    console.log('Orders Service start on PORT 6565')
})
