import express from 'express'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url'
import path from 'path'
import { users } from './data/users.js'
import { articles } from './data/articles.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

let usersArray = users

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

const __dirname = fileURLToPath(new URL('.', import.meta.url))
app.use(express.static(path.join(__dirname, 'public')))

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

app.get('/settings', (req, res) => {
  res.cookie('theme', 'light', { path: '/settings', maxAge: 3600000, httpOnly: true })

  const themeCookie = req.cookies.theme
  const tokenCookie = req.cookies.token

  res.status(200).render('settings.ejs', { themeCookie, tokenCookie })
})

app.get('/registration', (req, res) => {
  const title = 'Registration'
  res.render('registration.ejs', { title })
})

app.post('/registration', async (req, res) => {
  const { email, password, name, phone } = req.body

  if (usersArray.find((user) => user.email === email)) {
    return res.status(400).json({ message: 'Користувач з таким email вже існує' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = {
    id: uuidv4(),
    email,
    password: hashedPassword,
    phone,
    name
  }

  users.push(newUser)

  const token = jwt.sign({ id: newUser.id, email }, 'your-secret-key', { expiresIn: '1h' })

  res.cookie('token', token, { httpOnly: true, maxAge: 3600000 })
  res.status(201).json({ message: 'Користувач зареєстрований', token })
})

app.get('/login', (req, res) => {
  const title = 'Login'
  res.render('login.ejs', { title })
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = users.find((u) => u.email === email)

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id, email }, 'your-secret-key', { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 })
    res.status(200).render('login.ejs', { message: 'Ви успішно увійшли' })
  } else {
    res.status(401).render('login.ejs', { message: 'Неправильний логін або пароль' })
  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
