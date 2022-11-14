import Workout from '../models/workoutModel.js'
import mongoose from 'mongoose'

// get all workouts
const getWorkouts = async (req, res) => {  
  const user_id = req.user._id

  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })
  res.status(200).json({ workouts })
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  try {
    const workout = await Workout.findById(id)
    res.status(200).json(workout)
  }
  catch (error) {
    res.status(404).json({ error: 'No such workout' })
  }
}

// create a new workout
const createWorkout = async (req, res) => {  
  try {
    const user_id = req.user._id
    const workout = await Workout.create({ ...req.body, user_id })
    res.status(200).json(workout)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id })
    console.log('deleted workout: ', workout)
    res.status(200).json(workout)
  } catch (error) {
    res.status(404).json({ error: 'No such workout' })
  }
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  try {
    const workout = await Workout.findOneAndUpdate({ _id: id }, {
      ...req.body
    })
    res.status(200).json(workout)
  }
  catch (error) {
    res.status(404).json({ error: 'No such workout' })
  }
}

export {
  getWorkout,
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout
}