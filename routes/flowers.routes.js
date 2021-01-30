const {Router} = require('express');
const router = Router();
const Flowers = require('../models/Flowers');

//get all flowers ---

router.get('/all', async (req, res) => {
        try {
            const result = await Flowers.find({});
            res.json(result)
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

//post one new flower ---

router.post('/add', async(req, res) => {
    try {
        const {name, description, price, count} = req.body;

        const flower = new Flowers({name, description, price, count})

        await flower.save();

        res.status(200).json({message: 'new flower is created'})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router;