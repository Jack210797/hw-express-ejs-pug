import express from 'express'
import { protectedController } from '../controllers/protectedController.mjs'
import { authenticateToken } from '../middlewares/authMiddleware.mjs'

const router = express.Router()

router.get('/protected', authenticateToken, protectedController.getProtectedPage)

export default router
