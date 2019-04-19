const express = require('express');
const router = express.Router();
const userController = require('./UserController');

const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result || { message: 'OK' });
  } catch (error) {
    return res.status(500) && next(error);
  }
};
const c = controllerHandler;

/* GET all users listing. */
router.get('/', c(userController.getAllUsers, (req, res, next) => []));

/* Add a user. */
router.post('/', c(userController.addUser, (req, res, next) => [req.body.user]));

/* Update a user. */
router.put('/:email', c(userController.updateUser, (req, res, next) => [req.params.email, req.body.user]));

/* GET a single user. */
router.get('/:email', c(userController.getUser, (req, res, next) => [req.params.email]));

/* Delete a user */
router.delete('/:email', c(userController.deleteUser, (req, res, next) => [req.params.email]));

module.exports = router;