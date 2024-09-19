import { ObjectId } from 'mongodb'
import { connectDB } from '../../db.mjs'

export const createArticles = async (req, res, next) => {
  try {
    const db = await connectDB()
    const articles = db.collection('articles')

    if (Array.isArray(req.body)) {
      const result = await articles.insertMany(req.body)
      res.status(201).send(`Created ${result.insertedCount} articles`)
    } else {
      const result = await articles.insertOne(req.body)
      res.status(201).send(`Article created with id ${result.insertedId}`)
    }
  } catch (error) {
    next(error)
  }
}

export const getArticles = async (req, res, next) => {
  try {
    const db = await connectDB()
    const articles = db.collection('articles')

    const projection = { title: 1, content: 1, _id: 1 }

    const articlesList = (await articles.find({}, { projection }).toArray()) || []

    if (articlesList.length > 0) {
      res.render('articles.ejs', { title: 'Articles', articles: articlesList })
    } else {
      res.status(404).send('Articles not found')
    }
  } catch (error) {
    next(error)
  }
}

export const getArticleByID = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Недійсний ID статті')
  }

  try {
    const db = await connectDB()
    const articles = db.collection('articles')
    const article = await articles.findOne({ _id: new ObjectId(req.params.id) })

    if (article) {
      res.render('articleId.ejs', { title: article.title, article })
    } else {
      res.status(404).json({ error: 'Article not found' })
    }
  } catch (error) {
    next(error)
  }
}

export const deleteArticle = async (req, res, next) => {
  if (!ObjectId.isValid(id)) {
    return res.status(400).send('Недійсний ID статті')
  }

  try {
    const db = await connectDB()
    const articles = db.collection('articles')

    const result = await articles.deleteOne({ _id: new ObjectId(req.params.id) })
    if (result.deletedCount === 0) {
      return res.status(404).send('Статтю не знайдено')
    }
    res.status(200).send(`Статтю з ID ${id} видалено`)
  } catch (error) {
    next(error)
  }
}

export const deleteManyArticles = async (req, res, next) => {
  try {
    const db = await connectDB()
    const articles = db.collection('articles')

    const result = await articles.deleteMany(req.body.filter || {})
    res.status(200).send(`Видалено ${result.deletedCount} статті`)
  } catch (error) {
    next(error)
  }
}

export const updateArticle = async (req, res, next) => {
  if (!ObjectId.isValid(id)) {
    return res.status(400).send('Недійсний ID статті')
  }

  try {
    const db = await connectDB()
    const articles = db.collection('articles')

    const result = await articles.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    if (result.matchedCount === 0) {
      return res.status(404).send('Статтю не знайдено')
    }
    res.status(200).send(`Статтю з ID ${id} оновлено`)
  } catch (error) {
    next(error)
  }
}

export const updateManyArticles = async (req, res, next) => {
  try {
    const db = await connectDB()
    const articles = db.collection('articles')
    const filter = req.body.filter || {}
    const update = { $set: req.body.update || {} }
    const result = await articles.updateMany(filter, update)
    res.status(200).send(`Оновлено ${result.modifiedCount} cтатті`)
  } catch (error) {
    next(error)
  }
}

export const replaceArticle = async (req, res, next) => {
  try {
    const db = await connectDB()
    const articles = db.collection('articles')
    const result = await articles.replaceOne({ _id: new ObjectId(req.params.id) }, req.body)
    if (result.matchedCount === 0) {
      return res.status(404).send('Cтаттю не знайдено')
    }
    res.status(200).send(`Cтаттю з id ${req.params.id} замінено`)
  } catch (error) {
    next(error)
  }
}
