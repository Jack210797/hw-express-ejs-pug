export const rootController = {
  getHomePage: (req, res) => {
    const home = 'home'
    const title = 'Home'
    if (req.isAuthenticated()) {
      res.render('index', { home, title })
    } else {
      res.redirect('/login')
    }
  }
}
