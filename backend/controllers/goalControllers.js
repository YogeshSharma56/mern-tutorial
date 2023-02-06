// Private access
const asyncHandler = require ('express-async-handler')

const getGoals = asyncHandler (async (req, res) => {
    res.json({message: 'Get Goals'})
})
const setGoals = asyncHandler (async (req, res) => {
   if (!req.body.text){
    res.status()
    throw new Error("Add a text field")
   }
   
    res.status(200).json({message: 'Create Goals'})

})
const updateGoals = asyncHandler (async (req, res) => {
    res.json({message: `Update Goals ${req.params.id}`})
})
const deleteGoals = asyncHandler (async (req, res) => {
    res.json({message: `Delete Goals ${req.params.id}`})
})

module.exports = {
    getGoals,setGoals, updateGoals, deleteGoals
}