const keys = require('./keys')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// const mongoURI = 'mongodb+srv://rp:rp123@cluster0.i9xwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoURI = `mongodb://${keys.mongoHost}:${keys.mongoPort}/library_orders`

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



app.get("/orders/:id", async (req, res) => {
    try {
      const resOrder = await Order.findById({ _id: req.params.id });
  
      if (resOrder) {
        axios
          .get("http://customer-service:5555/customers/" + resOrder.customerId)
          .then((resCustomer) => {
            if (resCustomer) {
              axios
                .get("http://book-service:4545/books/" + resOrder.bookId)
                .then((resBook) => {
                  if (resBook) {
                    let authorObj = {
                      customerName: resCustomer.data.name,
                      bookTitle: resBook.data.title,
                      initialDate: resOrder.initialDate,
                      deliveryDate: resOrder.deliveryDate,
                    };
                    console.log(authorObj);
                    res.json(authorObj);
                  } else {
                    res
                      .status(404)
                      .json({ message: "No such Order->Book Found" });
                  }
                })
                .catch((err) => {
                  console.log(err);
                  res.json({ error: err });
                });
            } else {
              res.status(404).json({ message: "No such Order->Customer Found" });
            }
          })
          .catch((err) => {
            console.log(err);
            res.json({ error: err });
          });
  
      } else {
        res.status(404).json({ message: "No such Order Found" });
      }
    } catch (err) {
      res.json({ error: err });
    }
  });


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
