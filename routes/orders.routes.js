const {Router} = require('express');
const config = require('config');
const {check, validationResult} = require('express-validator');
const router = Router();
const Orders = require('../models/Orders');
const User = require('../models/User');

//get all user orders ---

router.get('/all', async(req, res) => {
    try {
        const {userId} = req.query;

        const result = await Orders.find({ user: userId })
        res.json(result)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

//add new order from user

router.post('/add', async(req, res) => {
    try {

        const {userId, price} = req.body

        const order = new Orders({user: {_id: userId}, price});
        await order.save();

        const user = await User.findById({_id: order.user});
        user.orders.push(order);
        await user.save();

        return res.status(201).json({message: 'Заказ добавлен'});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router;