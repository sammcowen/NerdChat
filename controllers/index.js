const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const apiroutes = require('./apiRoutes')
// const dashboardRoutes = require('./dashboard-routes.js')
router.use('/', homeRoutes);
router.use('/api', apiroutes )
// router.use('/dashboard', dashboardRoutes);

router.use((req,res)=> {
    res.status(404).end();
});
module.exports =router;