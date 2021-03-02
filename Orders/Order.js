const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    customerId:{
        type:mongoose.SchemaTypes.ObjectId,
        require:true
    },
    bookId:{
        type:mongoose.SchemaTypes.ObjectId,
        require:true
    },
    initialDate:{
        type:Date,
        require:true
    },
    deliveryDate:{
        type:Date,
        require:true
    }
});

module.exports = Order = mongoose.model('orders',OrdersSchema);