const router = require('express').Router();
// const sequelize = require() 
router.get('/', (req,res) => {
    res.render('homepage');
});

module.exports = router;