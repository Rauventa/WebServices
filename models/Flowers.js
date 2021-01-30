const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    count: {type: Number, required: true}
});

module.exports = model('Flowers', schema);