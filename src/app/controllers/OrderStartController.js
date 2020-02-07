// import * as Yup from 'yup';
import Order from '../models/Order';

class OrderStartController {
  async update(req, res) {
    const order = await Order.findByPk(req.params.id);

    const date_now = new Date();

    if (!(date_now.getHours() >= 8 && date_now.getHours() <= 18)) {
      return res.status(400).json({ error: 'This hour is not permited.' });
    }

    await order.update({
      start_date: date_now,
    });

    return res.json(order);
  }
}

export default new OrderStartController();
