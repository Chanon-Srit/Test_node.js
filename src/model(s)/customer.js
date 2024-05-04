const mongoose = require('mongoose');

newCustomerSchema = new mongoose.Schema({
    name: String,
    // {
    //     type: String,
    //     required: true
    // },
    industry: String
});

module.exports = mongoose.model('Customer', newCustomerSchema);