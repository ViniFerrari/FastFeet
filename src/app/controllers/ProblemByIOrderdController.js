import Problem from '../models/Problem';
import Order from '../models/Order';

class ProblemByIOrderdController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order not found.' });
    }

    const problem = await Problem.findAll({
      where: { order_id: order.id },
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(problem);
  }
}

export default new ProblemByIOrderdController();
