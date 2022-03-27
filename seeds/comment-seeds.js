const {Comment} = require('../models');

const commentData = [
    {
        user_id:1,
        post_id:2,
        comment_text:'Great Job!'
       
        },
        {
            user_id:3,
            post_id:3,
            comment_text:'Well said'

        },
        {
            user_id:2,
            post_id:1,
            comment_text:'Fantastic'
        }
    
]
const seedComments = () => Comment.bulkCreate(commentData)
module.exports = seedComments;