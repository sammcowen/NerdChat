const seedUsers = require('./user-seeds');
const seedComments = require('./comment-seeds');


const sequelize = require('../config/connection');
const seedPosts = require('./post-seeds');


const seedAll = async () => {
await sequelize.sync({force:true});
console.log('..DATABASE SYNCED ....');
await seedUsers();
console.log('..USERS SEEDED..');
await seedComments();
console.log('..COMMENTS SYNCED..');
await seedPosts();
console.log('..POSTS SEEDED..');
process.exit(0);
};

seedAll();