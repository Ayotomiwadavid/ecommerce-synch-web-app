const express = require('express');

const router = express.Router(); 

const users = require('../Controller/userController');

router.get('fetch-all-users', users.fetchAllUsers);
router.get('fetch-single-user', users.fetchSingleUser);
router.post('update-user-details', users.UpdateUser);
router.post('Store-user', users.storeUserToDb);
router.post('delete-user', users.deleteUser);

module.exports = router;