import express from 'express';
import getLists from './controllers/getLists';
import getList from './controllers/getList';
import createList from './controllers/createList';
import removeList from './controllers/removeList';
import updateList from './controllers/updateList';
import updateTask from './controllers/updateTask';
import removeTask from './controllers/removeTask';

const createRoutes = () => {
  const router = express.Router();

  router.get('/lists', getLists);
  router.get('/lists/:listName', getList);
  router.post('/lists/:listName', createList);
  router.put('/lists/:listName', updateList);
  router.delete('/lists/:listName', removeList);

  router.put('/lists/:listName/:id', updateTask);
  router.delete('/lists/:listName/:id', removeTask);


  return router;
}

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  if (module.hot) module.hot.accept();
}

export default createRoutes();
