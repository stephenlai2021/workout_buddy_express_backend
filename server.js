import * as dotenv from 'dotenv' 
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import workoutsRoutes from './routes/workoutsRoute.js'
import usersRoutes from './routes/usersRoute.js'
import refreshRoutes from './routes/refreshRoute.js'

const port = process.env.PORT || 5000

const app = express()

// middleware
// app.use(express.static('build'));

app.use(cors())

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/workouts', workoutsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/refresh', refreshRoutes)

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log('Connet to MongoDB successfully, server running on port ', port)
    })
    // console.log('Connet to MongoDB successfully, server running on port ', port)
  })
  .catch(error => {
    console.log('error: ', error.message)
  })

  // app.listen(port, () => {
  //   console.log('Server running on port ', port)
  // })