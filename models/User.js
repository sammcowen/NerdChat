const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const brcrypt = require('bycrypt');

// setup the user model 
class User extends Model {
    // check user password per instance
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}
User.init ({
    // create id column to accept numbers only and cannot be null 
    id:{
        type:DataTypes.INTEGER, 
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    // username col to accept string as input cannot be empty
    username: {
        type:DataTypes.STRING,
        allowNull:false
    },
    // email column is to be 4 in length at least and a string can be enetered cannot be null
    email: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[4]
        }
    }
},
{   hooks: {
    // set up beforeCreate lifecycle "hook" functionality
    async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
    },
      // set up beforeUpdate lifecycle "hook" functionality
    async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
    }
  },

sequelize,
timestamps: false,
freezeTableName: true,
underscored: true,
modelName: 'user'
}
);

module.exports = User;
