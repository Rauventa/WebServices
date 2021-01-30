const {Schema, model} = require('mongoose');

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderTime: {type: Date, default: Date.now},
    price: {type: Number, required: true}
});

module.exports = model('Orders', schema);