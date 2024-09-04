import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import { users } from './data/users.js'
import { articles } from './data/articles.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  const home = 'home'
  const title = 'Home'
  res.render('index', {
    home,
    title
  })
})

app.get('/users', (req, res) => {
  const title = 'Users'
  res.render('users', {
    title,
    users
  })
})

app.get('/users/:userId', (req, res) => {
  const id = parseInt(req.params.userId)
  const user = users[id - 1]

  if (user) {
    res.render('userId', { user })
  } else {
    res.status(404).send('User not found')
  }
})

app.get('/articles', (req, res) => {
  const title = 'Articles'
  res.render('articles.ejs', {
    title,
    articles
  })
})

app.get('/articles/:articleId', (req, res) => {
  const id = parseInt(req.params.articleId)
  const article = articles[id - 1]

  if (article) {
    res.render('articleId.ejs', {
      title: article.title,
      article
    })
  } else {
    res.status(404).send('Статтю не знайдено')
  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
