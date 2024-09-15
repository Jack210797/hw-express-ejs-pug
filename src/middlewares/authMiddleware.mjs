import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).redirect('/login')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    req.user = decoded
    next()
  } catch (error) {
    console.error('Помилка аутентифікації:', error)
    res.status(403).redirect('/login')
  }
}
