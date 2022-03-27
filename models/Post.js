const { Model, Datatypes, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

// Post extends Model 
class Post extends Model { }
// creating post 'table'
Post.init(
    {
        // id column accepts integers, cant be null, auto increments and is primary key
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // title column accepts strings, and cannot be null
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // post_content can be null, and is text because users may post lengthy article
        post_content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // user_id column accepts integer and refernces the user_id from  User table
        user_id: {
            type: DataTypes.INTEGER,
            references : {
                model: User,
                key:'id'
            }
        }
    },
    {
    sequelize,
    freezeTableName:true,
    underscored:true,
    modelName:'post'
    }
);

module.exports = Post;