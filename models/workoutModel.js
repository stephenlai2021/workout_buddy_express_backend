import mongoose from 'mongoose'

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  title: { 
    type: String,
    required: true
  },
  reps: {
    type: Number,
    require: true
  },
  load: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

// export default mongoose.model('Workout', workoutSchema) 
export default mongoose.model('Workout', workoutSchema) 

