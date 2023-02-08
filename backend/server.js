const express = require ('express');
const dotenv = require ('dotenv').config()
const colors = require ('colors')
const app = express();
const {errorHandler} = require ('./middleware/errormiddleware')
const connectDB = require ('./config/db')
const port = process.env.PORT ;

connectDB()
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/api/goals' , require('./routes/goalRoutes'));

app.use(errorHandler)

app.listen(port, () => console.log("Server running on Port "+port));
