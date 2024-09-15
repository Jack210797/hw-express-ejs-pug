import { ObjectId } from 'mongodb'
import { connectDB } from '../../db.mjs'

export const createArticle = async (req, res, next) => {
  try {
    const db = await connectDB()
    const articles = db.collection('articles')
    const result = await articles.insertOne(req.body)
    res.status(201).send(`Article created with id ${result.insertedId}`)
  } catch (error) {
    next(error)
  }
}

export const getArticle = async (req, res, next) => {
  try {
    const db = await connectDB()
    const articles = db.collection('articles')

    if (req.params.id) {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Недійсний ID статті')
      }

      const id = new ObjectId(req.params.id)
      const article = await articles.findOne({ _id: id })

      if (article) {
        res.render('articleId.ejs', { title: article.title, article })
      } else {
        res.status(404).send('Article not found')
      }
    } else {
      const articlesList = await articles.find({}).toArray()
      const title = 'Articles'
      res.render('articles.ejs', { title, articles: articlesList })
    }
  } catch (error) {
    next(error)
  }
}

export const deleteArticle = async (req, res, next) => {
  try {
    const db = await connectDB()
    const articles = db.collection('articles')
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
      return res.status(400).send('Недійсний ID статті')
    }

    const result = await articles.deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) {
      return res.status(404).send('Статтю не знайдено')
    }
    res.status(200).send(`Статтю з ID ${id} видалено`)
  } catch (error) {
    next(error)
  }
}

export const updateArticle = async (req, res, next) => {
  try {
    const db = await connectDB()
    const articles = db.collection('articles')
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
      return res.status(400).send('Недійсний ID статті')
    }

    const result = await articles.updateOne({ _id: new ObjectId(id) }, { $set: req.body })
    if (result.matchedCount === 0) {
      return res.status(404).send('Статтю не знайдено')
    }
    res.status(200).send(`Статтю з ID ${id} оновлено`)
  } catch (error) {
    next(error)
  }
}
