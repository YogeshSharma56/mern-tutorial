const mongoose = require ('mongoose')

const goalSchema = mongoose.Schema({
        text:{
            type: String,
            required: [true, "Please enter a text Value"]
        }
    },
    {
        timestamps:true
    })

    module.exports = mongoose.model('Goal', goalSchema)