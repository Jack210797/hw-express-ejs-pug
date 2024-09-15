export const settingsController = {
  getSettingsPage: (req, res) => {
    const themeCookie = req.cookies.theme
    const tokenCookie = req.cookies.token
    res.render('settings.ejs', { themeCookie, tokenCookie })
  },

  updateSettings: (req, res) => {
    const { theme } = req.body
    res.cookie('theme', theme, { path: '/settings', maxAge: 3600000, httpOnly: true })
    res.redirect('/settings')
  }
}
