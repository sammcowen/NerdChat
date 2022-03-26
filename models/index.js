const User = require('./User');

// associations 
User.hasMany(Post, {
    foreignKey:'user_id'
});

module.exports = {User}