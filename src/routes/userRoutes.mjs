import express from 'express'
import {
  createUsers,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
  updateManyUsers,
  replaceUser,
  deleteManyUsers
} from '../controllers/userControllers.mjs'
import { ObjectId } from 'mongodb'

const router = express.Router()

const validateObjectId = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Недійсний ID користувача' })
  }
  next()
}

router.get('/users', getUsers)
router.get('/users/:id', validateObjectId, getUserByID)

router.post('/users', createUsers)

router.put('/users/:id', updateUser)
router.put('/users', updateManyUsers)
router.put('/users/:id/replace', replaceUser)

router.delete('/users/:id', deleteUser)
router.delete('/users', deleteManyUsers)

export default router
