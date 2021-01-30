const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/orders', require('./routes/orders.routes'));
app.use('/api/flowers', require('./routes/flowers.routes'));
app.use('/api/cart', require('./routes/cart.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server error', e.message);
        // process exit - служит для выхода из приложения при ошибке
        process.exit(1);
    }
}

start();