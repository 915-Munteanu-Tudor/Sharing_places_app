const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const { response } = require('express');

const app = express();

app.use('/api/places', placesRoutes);

//error handling middleware function
app.use((error, req, res, next) => {
    //if resp has already been sent
    if (response.headersSent === true) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occured!'});
});

app.listen(5000);