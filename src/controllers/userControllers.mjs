import { ObjectId } from 'mongodb'
import { connectDB } from '../../db.mjs'

export const createUsers = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')

    if (Array.isArray(req.body)) {
      const result = await users.insertMany(req.body)
      res.status(201).send(`Created ${result.insertedCount} users`)
    } else {
      const result = await users.insertOne(req.body)
      res.status(201).send(`User created with id ${result.insertedId}`)
    }
  } catch (error) {
    next(error)
  }
}

export const getUsers = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')

    const projection = { name: 1, age: 1, city: 1, email: 1, phone: 1, _id: 1 }
    const cursor = users.find({}, { projection })

    const usersList = await cursor.toArray()

    if (usersList.length > 0) {
      res.render('users', { title: 'Users List', users: usersList })
    } else {
      res.status(404).send('Список користувачів порожній')
    }
  } catch (error) {
    next(error)
  }
}

export const getUserStats = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')

    const stats = await users
      .aggregate([
        {
          $group: {
            _id: null,
            totalUsers: { $sum: 1 },
            averageAge: { $avg: '$age' },
            uniqueEmails: { $addToSet: '$email' },
            cities: { $addToSet: '$city' }
          }
        },
        {
          $project: {
            _id: 0,
            totalUsers: 1,
            averageAge: { $round: ['$averageAge', 2] },
            uniqueEmailCount: { $size: '$uniqueEmails' },
            uniqueCityCount: { $size: '$cities' }
          }
        }
      ])
      .toArray()
    if (stats.length > 0) {
      res.json(stats[0])
    } else {
      res.status(404).send('Статистика користувачів недоступна')
    }
  } catch (error) {
    next(error)
  }
}

export const getUserByID = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')
    const user = await users.findOne({ _id: new ObjectId(req.params.id) })

    if (user) {
      res.render('userId', { title: user.name, user })
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')
    const result = await users.deleteOne({ _id: new ObjectId(req.params.id) })
    if (result.deletedCount === 0) {
      return res.status(404).send('User not found')
    }
    res.status(200).send(`User with id ${req.params.id} deleted`)
  } catch (error) {
    next(error)
  }
}

export const deleteManyUsers = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')

    const result = await users.deleteMany(req.body.filter || {})
    res.status(200).send(`Видалено ${result.deletedCount} користувачів`)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')
    const result = await users.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })

    if (result.matchedCount === 0) {
      return res.status(404).send('User not found')
    }
    res.status(200).send(`User with id ${req.params.id} updated`)
  } catch (error) {
    next(error)
  }
}

export const updateManyUsers = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')
    const filter = req.body.filter || {}
    const update = { $set: req.body.update || {} }
    const result = await users.updateMany(filter, update)
    res.status(200).send(`Оновлено ${result.modifiedCount} користувачів`)
  } catch (error) {
    next(error)
  }
}

export const replaceUser = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')
    const result = await users.replaceOne({ _id: new ObjectId(req.params.id) }, req.body)
    if (result.matchedCount === 0) {
      return res.status(404).send('Користувача не знайдено')
    }
    res.status(200).send(`Користувача з id ${req.params.id} замінено`)
  } catch (error) {
    next(error)
  }
}
