import User from '../models/User';
import Notification from '../models/Notification';

class NotificationController{
  async index(req, res){
    //verificando se o usuario logado é de um prestador de serviço (provider = true)
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    })
    if(!isProvider){
      return res.status(401).json({ error: 'Você não é prestador de serviço'});
    }
	
	const notifications = await Notification.findAll({
      where: { user: req.userId},
      order: ['createdAt'],
      limit: 20,
    });
	
    return res.status(200).json(notifications);
  }

  async update(req, res){
    //const notification = await Notification.findById(req.params.id);
    const notification = await Notification.findByPk(req.params.id);
	if (!notification){
		return res.status(404).json({ error: 'A notificação solicitada não foi localizada' });
	}
	await notification.update({read: true });
    return res.status(200).json(notification);
  }
}

export default new NotificationController();