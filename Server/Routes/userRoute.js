const express = require('express');

const router = express.Router(); 

const users = require('../Controller/userController');
const authenticate = require('../Middleware/authenticate');

router.get('/', authenticate,  users.fetchAllUsers);
router.get('/fetch-single-user', authenticate,  users.fetchSingleUser);
router.post('/update-user-details', authenticate, users.UpdateUser);
router.post('/Store-user', authenticate, users.storeUserToDb);
router.post('/delete-user', authenticate, users.deleteUser);

module.exports = router;