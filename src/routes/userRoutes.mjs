import express from 'express'
import {
  createUser,
  createManyUsers,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
  updateManyUsers,
  replaceUser,
  deleteManyUsers
} from '../controllers/userControllers.mjs'

const router = express.Router()

router.get('/users', getUsers)
router.get('/users/:id', getUserByID)

router.post('/user', createUser)
router.post('/users', createManyUsers)

router.put('/users/:id', updateUser)
router.put('/users', updateManyUsers)
router.put('/user/:id/replace', replaceUser)

router.delete('/users/:id', deleteUser)
router.delete('/users', deleteManyUsers)

export default router
