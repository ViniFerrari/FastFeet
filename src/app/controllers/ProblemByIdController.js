import Problem from '../models/Problem';
import Order from '../models/Order';

class ProblemByIdController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { id } = await Order.findByPk(req.params.id);

    const problem = await Problem.findAll({
      where: { order_id: id },
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(problem);
  }
}

export default new ProblemByIdController();
