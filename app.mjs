import express from 'express'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url'
import path from 'path'
import cookieParser from 'cookie-parser'
import flash from 'express-flash'
import session from 'express-session'
import passport from 'passport'
import dotenv from 'dotenv'
import router from './src/routes/index.mjs'
import { ObjectId } from 'mongodb'
import { connectDB } from './db.mjs'
import { errorHandler } from './src/middlewares/errorMidleware.mjs'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const sessionOptions = {
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000, httpOnly: true, secure: process.env.NODE_ENV === 'production' }
  })
)

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(router)

app.use(errorHandler)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const db = await connectDB()
    const usersCollection = db.collection('users')
    const user = await usersCollection.findOne({ _id: new ObjectId(id) })
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const __dirname = fileURLToPath(new URL('.', import.meta.url))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use((req, res, next) => {
  console.log('Is authenticated:', req.isAuthenticated())
  console.log('Session:', req.session)
  console.log('User:', req.user ? req.user._id : 'Not authenticated')
  next()
})

app
  .listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
  .on('error', (error) => {
    console.error('Помилка запуску сервера:', error.message)
    process.exit(1)
  })
