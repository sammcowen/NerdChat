const router = require('express').Router();

const {User, Post, Comment} = require('../../models');

// GET API USERS    route
router.get('/', (req,res) => {
    User.findAll({
        attributes:{ exclude:['password']}
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// post route for creating a user 
// POST /api/users
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
    
  })
  .then(userData => {
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
  
      res.json(userData);
    });
  });
});
// LOGIN ROUTE 
  // LOGIN
  router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(userData => {
      if (!userData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        // declare session variables
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.email = userData.email;
        req.session.loggedIn = true;
  
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    });
  });
module.exports = router;  
