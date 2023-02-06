const express = require ('express');
const dotenv = require ('dotenv').config()
const app = express();
const {errorHandler} = require ('./middleware/errormiddleware')
const port = process.env.PORT ;

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/api/goals' , require('./routes/goalRoutes'));

app.use(errorHandler)

app.listen(port, () => console.log("Server running on Port "+port));
