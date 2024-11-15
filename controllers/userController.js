const prisma = require("../prisma/index")
const cookieToken = require("../utils/cookieToken")

exports.signup = async (req, res, next) => {
    try {
       
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error("please give all the fields name , email and password");
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });

        // send user a token
        cookieToken(user,res)

    } catch (error) {
       throw new Error(error) 
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Please provide email and password both");
        }
        
        const user = await prisma.user.findUnique({
            where: {
                email:email
            }
        })


        if (!user) {
            throw new Error("User not found")
        }

      

        if (password != user.password) {
            throw new Error("Password is Incorrect");
        }

        // user is there and validated
        cookieToken(user, res);
    } catch (error) {
        throw new Error(error)
    }
}

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('token');
        res.json({
            success: true,
            message:"user logout successfully"
        })
       
    } catch (error) {
        throw new Error(error+"error while logout");
    }
}