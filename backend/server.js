const express = require('express');
const dotenv = require('dotenv').config()
const port = 5000;
const {errorHandler} = require('./middleware/errorMiddleware');

const app = express();

//necessary to use body data
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(errorHandler)


app.use('/api/goals', require('./routes/goalRoutes'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

