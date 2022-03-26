const bcrypt = require('bcrypt');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const hbs = exphbs.create({helpers});


const sess = {
    secret: 'feefifom',
    cookie: {// Session will automatically expire in 10 minutes
        expires: 10 * 60 * 1000},
    resave: true,
    rolling:true,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };



const app = express();
const PORT = process.env.PORT || 3001;


// const sequelize = require()
// setting up handlebars as the view engine for views folder
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
// setting up server to be synced with sequelize db
sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));
});