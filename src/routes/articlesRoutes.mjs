import express from 'express'
import {
  createArticles,
  getArticles,
  getArticleByID,
  deleteArticle,
  updateArticle,
  replaceArticle,
  deleteManyArticles,
  updateManyArticles
} from '../controllers/articleController.mjs'
import { ObjectId } from 'mongodb'

const router = express.Router()

const validateObjectId = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Недійсний ID статті' })
  }
  next()
}

router.get('/articles', getArticles)
router.get('/articles/:id', validateObjectId, getArticleByID)

router.post('/articles', createArticles)

router.put('/articles/:id', updateArticle)
router.put('/articles', updateManyArticles)
router.put('/articles/:id/replace', replaceArticle)

router.delete('/articles/:id', deleteArticle)
router.delete('/articles', deleteManyArticles)

export default router
