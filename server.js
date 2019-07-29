const express = require('express');
const cors =require('cors');
const route = require('./routes/route');
const methodOverride = require('method-override');
const winston = require('winston');

const app = express()
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', route);
app.use(methodOverride());
require('./startup/db');
app.use((err, req, res, next) => {
    console.log('hiii')
    res.status(400).json({
        error: err.message });
});
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports= app;