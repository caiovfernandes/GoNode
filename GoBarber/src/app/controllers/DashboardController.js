const { User, Appointment } = require('../models')
const moment = require('moment')
const { Op } = require('sequelize')
class DashboardController {
  async index (req, res) {
    if (!res.locals.user.provider) {
      const providers = await User.findAll({ where: { provider: true } })
      return res.render('dashboard', { providers })
    }
    // const { id } = req.session.user

    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'user_id' }],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      }
    })

    // const appointments = await Appointment.findAll({
    //   include: [{ model: User, as: 'user_id' }],
    //   where: {
    //     provider_id: id
    //   }
    // })
    return res.render('providerDashboard', { appointments })
  }
}
module.exports = new DashboardController()
