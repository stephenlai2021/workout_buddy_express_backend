import * as dotenv from 'dotenv' 
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import workoutsRoutes from './routes/workouts.js'
import usersRoutes from './routes/users.js'

const port = process.env.PORT || 5000

const app = express()

// middleware
app.use(express.static('build'));

app.use(cors())

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/workouts', workoutsRoutes)
app.use('/api/users', usersRoutes)

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log('Connet to MongoDB successfully, server running on port ', port)
    })
  })
  .catch(error => {
    console.log('error: ', error.message)
  })