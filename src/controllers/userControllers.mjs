import { ObjectId } from 'mongodb'
import { connectDB } from '../../db.mjs'

export const createUser = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')
    const result = await users.insertOne(req.body)
    res.status(201).send(`User created with id ${result.insertedId}`)
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')

    if (req.params.id) {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Недійсний ID користувача')
      }

      const id = new ObjectId(req.params.id)
      const user = await users.findOne({ _id: id })

      if (user) {
        res.render('userId', { title: user.name, user })
      } else {
        res.status(404).send('User not found')
      }
    } else {
      const usersList = await users.find({}).toArray()
      const title = 'Users'
      res.render('users', { title, users: usersList })
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
