import express from 'express'
import { createArticle, getArticle, deleteArticle, updateArticle } from '../controllers/articleController.mjs'

const router = express.Router()

router.post('/articles', createArticle)
router.get('/articles', getArticle)
router.get('/articles/:id', getArticle)
router.delete('/articles/:id', deleteArticle)
router.put('/articles/:id', updateArticle)

export default router
