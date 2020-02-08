import Problem from '../models/Problem';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DistributorProblem {
  async index(req, res) {
    const { page = 1 } = req.query;

    const problem = await Problem.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      attributes: [],
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['id', 'product'],
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['name', 'email'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['name', 'path', 'url'],
                },
              ],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['name', 'street', 'number', 'city', 'state'],
            },
          ],
        },
      ],
    });

    return res.json(problem);
  }

  async delete(req, res) {
    const orderExists = await Order.findByPk(req.params.id);

    if (!orderExists) {
      return res.status(400).json({ error: 'Order not found.' });
    }

    const { order_id, description } = await Problem.findByPk(req.params.id);

    const order = await Order.findOne({
      where: { id: order_id },
      attributes: ['id', 'product'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    order.canceled_at = new Date();

    await order.save();

    await Queue.add(CancellationMail.key, {
      order,
      description,
    });

    return res.json(order);
  }
}

export default new DistributorProblem();
