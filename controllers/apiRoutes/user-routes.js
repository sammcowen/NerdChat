const router = require('express').Router();

const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// GET API USERS route
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  router.get('/:id', (req, res) => {
    // Acess the User model and run the findOne() method to get a single user based on parameters
    User.findOne({
      // when the data is sent back, exclude the password property
      attributes: { exclude: ['password'] },
      where: {
        // use id as the parameter for the request
        id: req.params.id
      },
      // include the posts the user has created, the posts the user has commented on, and the posts the user has upvoted
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_text', 'created_at']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }
      ]
    })
      .then(userData => {
        if (!userData) {
          // if no user is found, return an error
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        // otherwise, return the data for the requested user
        res.json(userData);
      })
      .catch(err => {
        // if there is a server error, return that error
        console.log(err);
        res.status(500).json(err);
      });
  });


  
// post route for creating a  new user 
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
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// LOGIN ROUTE FOR A USER 

router.post('/login', (req, res) => {
  console.log({body:req.body});
  User.findOne({
    where: {
      email: req.body.email,

    }
  }).then(userData => {
    // if (!userData) {
      // res.status(400).json({ message: 'No user with that email address!' });
      // return;
    // }

    const validPassword = userData.checkPassword(req.body.password);

    // if (!validPassword) {
      // res.status(400).json({ message: 'Incorrect password!' });
      // return;
    // }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  });
});
// logout route
router.post('/logout',(req,res) => {
if(req.session.loggedIn) {
  req.session.destroy(() =>{
    res.status(204).end();
  });
}
else {
  res.status(404).end();
}
})


module.exports = router;  
