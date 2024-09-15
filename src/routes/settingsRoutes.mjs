import express from 'express'
import { settingsController } from '../controllers/settingsController.mjs'

const router = express.Router()

router.get('/settings', settingsController.getSettingsPage)
router.post('/settings', settingsController.updateSettings)

export default router
