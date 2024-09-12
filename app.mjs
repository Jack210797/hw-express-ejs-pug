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
import flash from 'express-flash'
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

const fakeUser = {
  id: 10,
  name: 'Fake User',
  email: 'fakeuser@example.com',
  password: '123456',
  isAdmin: true
}

const app = express()

const sessionOptions = {
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false
}

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    if (email === fakeUser.email && password === fakeUser.password) {
      return done(null, fakeUser)
    } else {
      return done(null, false, { message: 'Невірні дані' })
    }
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000, httpOnly: true, secure: false }
  })
)

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  if (id === fakeUser.id) {
    done(null, fakeUser)
  } else {
    done(new Error('Невірний ID користувача'))
  }
})

const __dirname = fileURLToPath(new URL('.', import.meta.url))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  const home = 'home'
  const title = 'Home'
  if (req.isAuthenticated()) {
    res.render('index', {
      home,
      title
    })
  } else {
    res.redirect('/login')
  }
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

  if (users.find((user) => user.email === email)) {
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

  const token = jwt.sign({ id: newUser.id, email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' })

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000
  })

  req.flash('success', 'Користувач успішно зареєстрований')
  res.redirect('/protected')
})

app.get('/login', (req, res) => {
  const title = 'Login'

  if (req.isAuthenticated()) {
    res.redirect('/protected')
  } else {
    res.render('login.ejs', { title })
  }
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.redirect('/login')
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '1h'
      })

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000
      })

      return res.redirect('/protected')
    })
  })(req, res, next)
})

app.get('/protected', (req, res) => {
  if (req.isAuthenticated() || req.cookies.token) {
    let user = req.user

    if (!user && req.cookies.token) {
      try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET || 'your-secret-key')
        user = users.find((u) => u.id === decoded.id)
      } catch (error) {
        console.error('Помилка верифікації токена:', error)
      }
    }

    if (user) {
      res.render('protected.ejs', { user: user })
    } else {
      res.redirect('/login')
    }
  } else {
    res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err)
    }
    res.redirect('/login')
  })
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
