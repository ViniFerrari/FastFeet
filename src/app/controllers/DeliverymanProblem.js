import * as Yup from 'yup';
import Order from '../models/Order';
import Problem from '../models/Problem';

class DeliverymanProblem {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const orderExists = await Order.findByPk(req.params.id);

    if (!orderExists) {
      return res.status(400).json({ error: 'Order not found.' });
    }

    const problem = await Problem.create({
      description: req.body.description,
      order_id: req.params.id,
    });

    return res.json(problem);
  }
}

export default new DeliverymanProblem();
