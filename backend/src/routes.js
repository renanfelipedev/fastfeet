import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import {
  authValidator,
  newSessionValidator,
  recipientStoreValidator,
  recipientUpdateValidator,
} from './app/validators';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/sessions', [newSessionValidator], SessionController.store);

routes.use(authValidator);
routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.delete('/recipients/:id', RecipientController.delete);
routes.post(
  '/recipients',
  [recipientStoreValidator],
  RecipientController.store
);
routes.put(
  '/recipients/:id',
  [recipientUpdateValidator],
  RecipientController.update
);

export default routes;
