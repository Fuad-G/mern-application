//Could use async await and try catch or .then .catch
//use express asyn handler to make try catch easier
const asyncHandler = require('express-async-handler')


//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get goals'})
});

//@desc Set goals
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field');
    }
    console.log(req.body.text)
    res.status(200).json({message: 'Set goal'})
});

//@desc update goals
//@route PUT /api/goals
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update ${req.params.id}`})
});

//@desc delete goal
//@route DELETE /api/goals
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete ${req.params.id}`})
});



module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}