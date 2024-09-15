import { Router } from 'express'
import userRoutes from './userRoutes.mjs'
import articleRoutes from './articlesRoutes.mjs'
import registrationRoutes from './registrationRoutes.mjs'
import loginRoutes from './loginRoutes.mjs'
import protectedRoutes from './protectedRoutes.mjs'
import logoutRoutes from './logoutRoutes.mjs'
import settingsRoutes from './settingsRoutes.mjs'
import rootRoutes from './rootRoutes.mjs'

const router = Router()

router.use('/', rootRoutes)
router.use('/', userRoutes)
router.use('/', articleRoutes)
router.use('/', registrationRoutes)
router.use('/', loginRoutes)
router.use('/', protectedRoutes)
router.use('/', logoutRoutes)
router.use('/', settingsRoutes)

export default router
