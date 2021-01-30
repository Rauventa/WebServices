const {Schema, model} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Orders'
        }
    ]
});

module.exports = model('User', schema);