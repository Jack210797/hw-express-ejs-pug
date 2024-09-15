import { connectDB } from '../../db.mjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registrationController = {
  getRegistrationPage: (req, res) => {
    const title = 'Реєстрація'
    res.render('registration.ejs', { title })
  },

  registerUser: async (req, res) => {
    try {
      const db = await connectDB()
      const usersCollection = db.collection('users')
      const { email, password, name, phone } = req.body

      const existingUser = await usersCollection.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'Користувач з таким email вже існує' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = {
        email,
        password: hashedPassword,
        name,
        phone
      }

      const result = await usersCollection.insertOne(newUser)

      const token = jwt.sign({ id: result.insertedId.toString(), email }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '1h'
      })

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000
      })

      req.flash('success', 'Користувач успішно зареєстрований')
      res.redirect('/protected')
    } catch (error) {
      console.error('Помилка при реєстрації:', error)
      res.status(500).json({ message: 'Внутрішня помилка сервера' })
    }
  }
}

export default registrationController
