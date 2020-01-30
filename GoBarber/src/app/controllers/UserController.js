const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    if (typeof req.body.provider === 'undefined') {
      req.body.provider = 0
    }

    if (req.file) {
      const { filename: avatar } = req.file
      await User.create({ ...req.body, avatar })
    } else {
      const avatar = 'Sem foto'
      await User.create({ ...req.body, avatar })
    }

    return res.redirect('/')
  }
}

module.exports = new UserController()
