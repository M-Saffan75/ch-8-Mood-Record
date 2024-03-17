const express = require('express');
const router = express.Router();
const { Valid_User } = require('../middleware/auth_middleware');
const { Login_Here, Current_User, Register_Here, User_Profile, } = require('../controllers/user_controller');


/* user Private Routes start Here */

router.use('/update/profile', Valid_User);
router.use('/current/user', Valid_User);

/* user Private Routes End Here */


/* user Public Routes start Here */

router.post('/login', Login_Here);
router.post('/register', Register_Here);
router.get('/current/user', Current_User);
router.post('/update/profile', User_Profile);
/* user Public Routes End Here */


module.exports = router;