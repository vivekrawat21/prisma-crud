const prisma = require("../prisma")

const jwt = require('jsonwebtoken');


const isLoggedIn = async (req, res, next) => {
    try {
        const token = await req.cookies.token;      
        if (!token) {
            res.send("you are not logged in");
            throw new Error("Not logged in");
        }
        const decoded = jwt.verify(token, process.env.JWT_SCERET);
        
        req.user = await prisma.user.findUnique({
            where: {
                id : decoded.userId
            }
        })
        // you can do more checks
        next()
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = isLoggedIn;