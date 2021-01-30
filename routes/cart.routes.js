const {Router} = require('express');
const router = Router();
const Cart = require('../models/Cart');

//get all ca ---

router.get('/all', async (req, res) => {
        try {
            const result = await Cart.find({});
            res.json(result)
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

//post one new item in cart ---

router.post('/add', async(req, res) => {
    try {
        const {name, description, price, count} = req.body;

        const duplicate = await Cart.findOne({name});

        if (duplicate) {
            return res.status(400).json({message: 'Товар уже находится в корзине'})
        }

        const item = new Cart({name, description, price, count})

        await item.save();
        res.status(200).json({message: 'new item was added to cart'})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.delete('/delete', async(req, res) => {
    try {
        const {id} = req.query;

        await Cart.findOneAndDelete({_id: id});

        res.status(200).json({message: 'new item was deleted from cart'})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.delete('/remove', async(req, res) => {
    try {
        await Cart.remove({});
        res.status(200).json({message: 'All items from cart removed now'})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router;