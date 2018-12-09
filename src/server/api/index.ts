import express from 'express';
import getLists from './controllers/getLists';
import getList from './controllers/getList';
import createList from './controllers/createList';
import removeList from './controllers/removeList';
import updateList from './controllers/updateList';

const createRoutes = () => {
  const router = express.Router();

  router.get('/lists', getLists);
  router.get('/lists/{listName}', getList);
  router.post('/lists/{listName}', createList);
  router.put('/lists/{listName}', updateList);
  router.delete('/lists/{listName}', removeList);

  return router;
}

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  if (module.hot) module.hot.accept();
}

export default createRoutes();
