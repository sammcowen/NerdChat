const {Post} = require('../models');
const  postData = [
    {
        title:"Handlebars",
        post_content:"Handlebars can help you dynamically generate html dynamically and easily. ",
        user_id:1
    },
    {
    title:"Test",
    post_content:"bla bla bla  ",
    user_id:3
    },
    {
        title:"Elon Muck wants to buy twitter ",
        post_content:"Should Elon Musk buy twitter or create his own social media platform ? thoughts? ",
        user_id:2
    }
]
const seedPosts = () => Post.bulkCreate(postData);
module.exports= seedPosts;