import express from 'express'
import { createUser, getUser, deleteUser, updateUser } from '../controllers/userControllers.mjs'

const router = express.Router()

router.post('/users', createUser)
router.get('/users', getUser)
router.get('/users/:id', getUser)
router.delete('/users/:id', deleteUser)
router.put('/users/:id', updateUser)

export default router
