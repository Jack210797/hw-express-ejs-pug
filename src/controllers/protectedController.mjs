import { connectDB } from '../../db.mjs'
import { ObjectId } from 'mongodb'

export const protectedController = {
  getProtectedPage: async (req, res) => {
    try {
      const db = await connectDB()
      const usersCollection = db.collection('users')
      const user = await usersCollection.findOne({ _id: new ObjectId(req.user.id) })

      if (!user) {
        return res.status(404).send('Користувача не знайдено')
      }

      res.render('protected.ejs', { title: 'Захищена сторінка', user })
    } catch (error) {
      console.error('Помилка при отриманні захищеної сторінки:', error)
      res.status(500).send('Внутрішня помилка сервера')
    }
  }
}
