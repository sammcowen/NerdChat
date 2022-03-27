const {User} = require('../models');
const { bulkCreate } = require('../models/User');

const userData = [
    {
        username:'DennistheMenace',
        email:'dennis@gmail.com',
        password:'password1!'
    },
    {
        username:'LilLex',
        email:'allie@gmail.com',
        password:'password2!'
    },
    {
        username:'SmartyPants',
        email:'smart@gmail.com',
        password:'password3!'
    }
]
const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;