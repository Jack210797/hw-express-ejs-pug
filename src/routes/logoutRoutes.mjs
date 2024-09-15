import express from 'express'
import { logoutController } from '../controllers/logoutController.mjs'

const router = express.Router()

router.get('/logout', logoutController.logout)

export default router
