const bcrypt = require('bcrypt');
const express = require('express');
const exphbs = require('express-handlebars');
const opath = require('path');
const session = require('express-session');
const { urlencoded } = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

// const sequelize = require()
// setting up handlebars as the view engine for views folder
app.engine('view engine', 'handelbars');
// middleware
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
// setting up server to be synced with sequelize db
sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));
});