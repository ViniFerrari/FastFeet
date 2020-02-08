import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import OrderByDeliverymanIdController from './app/controllers/OrderByDeliverymanIdController';
import OrdersEndByDeliverymanIdController from './app/controllers/OrdersEndByDeliverymanIdController';
import OrderStartController from './app/controllers/OrderStartController';
import OrderEndController from './app/controllers/OrderEndController';
import DistributorProblem from './app/controllers/DistributorProblem';
import RegisterProblem from './app/controllers/RegisterProblem';
import ProblemByIOrderdController from './app/controllers/ProblemByIOrderdController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/deliverymans/:id', OrderByDeliverymanIdController.index);
routes.get(
  '/deliverymans/:id/orders',
  OrdersEndByDeliverymanIdController.index
);

routes.put('/orders/:id/start', OrderStartController.update);
routes.put('/orders/:id/end', OrderEndController.update);

routes.post('/orders/:id/problems', RegisterProblem.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.post('/deliverymans/', DeliverymanController.store);
routes.get('/deliverymans/', DeliverymanController.index);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

routes.post('/orders/', OrderController.store);
routes.get('/orders/', OrderController.index);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

routes.get('/orders/:id/problems', ProblemByIOrderdController.index);
routes.get('/problems/', DistributorProblem.index);
routes.delete('/problems/:id/cancel-order', DistributorProblem.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
