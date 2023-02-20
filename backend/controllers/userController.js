const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asynchandler = require('express-async-handler')
const User = require('../models/userModel')
const { findOne } = require('../models/userModel')

const registerUser = asynchandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Pls enter all fields')
    }
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already Exist')
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid User Data")
    }

})

const loginUser = asynchandler(async (req, res) => {

    const {email, password} = req.body

    const user = await User.findOne({email})
    
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error("Invalid User Credentials")
    }
})
// Private endpoint
const getMe = asynchandler(async (req, res) => {
    
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(201).json({
        id: _id,
        name,
        email,
    })
})
//generate Token

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn: '30d'})
}


module.exports = {
    registerUser,
    getMe,
    loginUser
}