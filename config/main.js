require('dotenv').config();
module.exports = {
    'database': process.env.DATABASE,
    'port': process.env.PORT || 3000,
    'secret': process.env.JWT_SECRET,

};