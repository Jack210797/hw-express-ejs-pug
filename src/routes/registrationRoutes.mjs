import express from 'express'
import registrationController from '../controllers/registrationController.mjs'

const router = express.Router()

router.get('/registration', registrationController.getRegistrationPage)
router.post('/registration', registrationController.registerUser)

export default router
