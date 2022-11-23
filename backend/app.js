const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const HttpError = require('./models/http-error');
const { response } = require('express');

const app = express();

//extracts json from body, to any request incoming, calls next
app.use(bodyParser.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    throw new HttpError('Colud not find this route', 404);
});

//error handling middleware function
app.use((error, req, res, next) => {
    //if resp has already been sent
    if (response.headersSent === true) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occured!' });
});

app.listen(5000);