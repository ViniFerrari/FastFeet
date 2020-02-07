import * as Yup from 'yup';
import Order from '../models/Order';

class OrderEndController {
  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const order = await Order.findByPk(req.params.id);

    const date_now = new Date();

    await order.update({
      end_date: date_now,
      signature_id: req.body.signature_id,
    });

    return res.json(order);
  }
}

export default new OrderEndController();
