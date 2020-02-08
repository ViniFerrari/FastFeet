import { Op } from 'sequelize';
import * as Yup from 'yup';
import { startOfDay, endOfDay } from 'date-fns';
import Order from '../models/Order';

class OrderStartController {
  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const order = await Order.findByPk(req.params.id);

    if (order.canceled_at !== null) {
      return res.status(400).json({ error: 'This order has been canceled' });
    }

    if (order.start_date !== null) {
      return res.status(400).json({ error: 'This order has been retrieved' });
    }

    if (req.body.deliveryman_id !== order.deliveryman_id) {
      return res
        .status(400)
        .json({ error: 'This order will be made by another deliveryman' });
    }

    const date_now = new Date();

    const countStart = await Order.findAll({
      where: {
        deliveryman_id: req.body.deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(date_now), endOfDay(date_now)],
        },
      },
    });

    if (countStart.length > 5) {
      return res
        .status(401)
        .json({ error: 'You can only retrieve 5 orders per day' });
    }

    await order.update({
      start_date: date_now,
    });

    return res.json(order);
  }
}

export default new OrderStartController();
