const express = require('express');
const Router = express;
const { Valid_User } = require('../middleware/auth_middleware');
const { Recording_hopeful, Fetch_hope, Remove_hope } = require('../controllers/hope_controller');


const hoperouter = Router()

/* user Private Routes start Here */

hoperouter.use('/create/hope', Valid_User);
hoperouter.use('/fetch/hope', Valid_User);

/* user Private Routes End Here */


/* user Public Routes start Here */

hoperouter.post('/create/hope', Recording_hopeful);
hoperouter.get('/fetch/hope', Fetch_hope);
hoperouter.post('/remove/hope/:id', Remove_hope);

/* user Public Routes End Here */


module.exports = hoperouter;