import express from 'express'

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
  const home = 'home'
  const title = 'Home'
  res.render('index', {
    home,
    title
  })
})

app.get('/users', (req, res) => {
  const users = [
    { phone: '+132423432', name: 'John', email: 'example.com' },
    { phone: '+123122', name: 'Jane', email: 'example.com' },
    { phone: '+5345343', name: 'Jack', email: 'example.com' },
    { phone: '+4787', name: 'Jill', email: 'example.com' },
    { phone: '+55443453', name: 'Joe', email: 'example.com' },
    { phone: '+4345346', name: 'Janny', email: 'example.com' },
    { phone: '+344536547', name: 'Senny', email: 'example.com' },
    { phone: '+875678', name: 'Lenny', email: 'example.com' },
    { phone: '+98679789', name: 'Kenny', email: 'example.com' }
  ]

  const title = 'Users'

  res.render('users', {
    title,
    users
  })
})
app.get('/users/:Id', (req, res) => {
  const { userId } = req.params
  const user = {
    phone: '+132423432',
    name: 'John',
    email: 'example.com'
  }

  const title = 'User'
  res.render('userId', {
    title,
    user,
    userId
  })
})

app.get('/articles', (req, res) => {
  const articles = [
    {
      title: 'Article 1',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultric.'
    },
    {
      title: 'Article 2',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultric.'
    },
    {
      title: 'Article 3',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultric.'
    },
    {
      title: 'Article 4',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultric.'
    },
    {
      title: 'Article 5',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euis'
    }
  ]
  const title = 'Articles'
  res.render('articles.ejs', {
    title,
    articles
  })
})

app.get('/articles/:Id', (req, res) => {
  const article = {
    name: 'Article 1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultric.'
  }

  const title = 'Article'
  res.render('articleId.ejs', {
    article,
    title
  })
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
