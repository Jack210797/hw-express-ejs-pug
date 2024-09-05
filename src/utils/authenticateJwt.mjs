import jwt from 'jsonwebtoken'

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token

  if (token) {
    jwt.verify(token, 'your-secret-key', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Доступ заборонено або токен недійсний' })
      }
      req.user = user
      next()
    })
  } else {
    res.status(401).json({ message: 'Необхідна авторизація' })
  }
}

export default authenticateJWT
