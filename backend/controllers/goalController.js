//Could use async await and try catch or .then .catch
//use express asyn handler to make try catch easier
const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalsModel')
const User = require('../models/userModel');

//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ 
        user: req.user.id});
    console.log(req.user.id)
    res.status(200).json(goals)
});

//@desc Set goals
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field');
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id, //user is set from the middleware inside
    })

    res.status(200).json(goal)
});

//@desc update goals
//@route PUT /api/goals
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    const user = await User.findById(req.user.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found')
    }

    if (!user){
        res.status(400);
        throw new Error('User not found');
    } else {
        //Make sure the login user matches the login user
        if (goal.user.toString() !== user.id)
        {
            res.status(400)
            throw new Error('Unauthorized update');
        }
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
                    new: true, //returns the modified doc, not the original
    
    })

    res.status(200).json(updatedGoal);

 
});

//@desc delete goal
//@route DELETE /api/goals
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)
    const user = await User.findById(req.user.id);


    if (!goal) {
        res.status(400);
        throw new Error('Goal not found')
    }

    if (!user){
        res.status(400);
        throw new Error('User not found');
    } else {
        //Make sure the login user matches the login user
        if (goal.user.toString() !== user.id)
        {
            res.status(400)
            throw new Error('Unauthorized update');
        }
    }

    await goal.deleteOne();

    res.status(200).json({id: req.params.id})
});



module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}