const express = require('express');

// const locationRouter = require('./routes/locationRoutes');
// const storeRouter = require('./routes/storeRoutes');

const app = express();

/////////////////////// MIDDLEWARES ////////////////////////

app.use((req, res, next) => {
    console.log("testandooo");
    next();
});

// app.use('/api/v1/locations', locationRouter); 
// app.use('/api/v1/stores', storeRouter);

module.exports = app; 