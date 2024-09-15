import { connectDB } from '../../db.mjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const loginController = {
  getLoginPage: (req, res) => {
    const title = 'Вхід'
    res.render('login.ejs', { title })
  },

  loginUser: async (req, res, next) => {
    try {
      const db = await connectDB()
      const usersCollection = db.collection('users')
      const { email, password } = req.body

      const user = await usersCollection.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Користувача не знайдено' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Невірний пароль' })
      }

      const token = jwt.sign({ id: user._id.toString(), email }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '1h'
      })

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000
      })

      req.login(user, (err) => {
        if (err) {
          console.error('Помилка при створенні сесії:', err)
          return next(err)
        }
        console.log('Користувач успішно автентифікований:', user._id)
        req.flash('success', 'Успішний вхід')
        res.redirect('/protected')
      })
    } catch (error) {
      console.error('Помилка при вході:', error)
      res.status(500).json({ message: 'Внутрішня помилка сервера' })
    }
  }
}
