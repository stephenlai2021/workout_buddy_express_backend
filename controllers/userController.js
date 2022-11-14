import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const createToken = _id => {
  // token expires in 3 days
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '10m' })
}

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)
    
    res.status(200).json({ email, token })
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export { loginUser, signupUser }