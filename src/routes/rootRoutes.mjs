import express from 'express'
import { rootController } from '../controllers/rootController.mjs'

const router = express.Router()

router.get('/', rootController.getHomePage)

export default router
