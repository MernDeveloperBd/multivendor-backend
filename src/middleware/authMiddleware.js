
const UserService = require("../service/UserService");
const jwtProvider = require("../util/jwtProvider");

const authMiddleware = async(req, res, next) =>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message:"Invalid token, authorization failed"})
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"Invalid token, authorization failed"})
        }
        let email = jwtProvider.getEmailFromjwt(token);
        const userService = new UserService();
        const user =await userService.findUserByEmail(email)
        req.user = user;
        next()
    } catch (error) {
          res.status(500)
          .json({ message: error.message })
    }
}

module.exports = authMiddleware;