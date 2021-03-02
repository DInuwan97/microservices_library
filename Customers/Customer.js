const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:false
    },
    address:{
        type:String,
        require:false
    }
});

module.exports = Customer = mongoose.model('customers',CustomerSchema);