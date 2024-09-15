import express from 'express'
import { loginController } from '../controllers/loginController.mjs'

const router = express.Router()

router.get('/login', loginController.getLoginPage)
router.post('/login', loginController.loginUser)

export default router
