import express from 'express'
import { loginUser, signupUser } from '../controllers/userController.js'

const router = express.Router()

// loign route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

export default router