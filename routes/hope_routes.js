const express = require('express');
const router = express.Router();
const { Valid_User } = require('../middleware/auth_middleware');
const { Recording_hopeful } = require('../controllers/moods_controller');


/* user Private Routes start Here */

router.use('/update/profile', Valid_User);

/* user Private Routes End Here */


/* user Public Routes start Here */

router.post('/login', Recording_hopeful);

/* user Public Routes End Here */


module.exports = router;