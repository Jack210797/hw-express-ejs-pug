export const logoutController = {
  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('Помилка при виході:', err)
        return res.status(500).send('Помилка при виході')
      }
      res.clearCookie('token')
      req.session.destroy((err) => {
        if (err) {
          console.error('Помилка при знищенні сесії:', err)
        }
        res.redirect('/login')
      })
    })
  }
}
