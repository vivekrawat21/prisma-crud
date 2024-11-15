const jwt = require('jsonwebtoken');

const getJwtToken = (userId) => {
    return jwt.sign({ userId: userId }, process.env.JWT_SCERET, { expiresIn: '1 day' });

    
}

module.exports = getJwtToken;