const { User, Appointment } = require('../models')
class DashboardController {
  async index (req, res) {
    if (!res.locals.user.provider) {
      const providers = await User.findAll({ where: { provider: true } })
      return res.render('dashboard', { providers })
    }

    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      where: {
        provider_id: req.session.user.id
      }
    })

    return res.render('providerDashboard', { appointments })
  }
}
module.exports = new DashboardController()
