const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const apiroutes = require('./apiRoutes')
const dashboardRoutes = require('./dashboard-routes.js')
router.use('/', homeRoutes);
router.use('/api', apiroutes )
router.use('/dashboard', dashboardRoutes);


module.exports =router;