const bcrypt = require('bcrypt');
const express = require('express');
const exphbs = require('express-handlebars');
const opath = require('path');
const session = require('express-session');
const { urlencoded } = require('express');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});
// const sequelize = require()
// setting up handlebars as the view engine for views folder
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// middleware
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
// setting up server to be synced with sequelize db
sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));
});