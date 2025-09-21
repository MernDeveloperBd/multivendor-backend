const UserRoles = require("../domain/UserRole");
const AuthService = require("../service/AuthService");

class AuthController{
     async sendLoginOtp(req, res) {
            try {
                const email = req.body.email;
                await AuthService.sendLoginOtp(email)
                res.status(200).json({message:"OTP sent successfully"})
            } catch (error) {
                res.status(error instanceof Error ? 404 : 500)
                .json({ message: error.message })
            }
        }

// create user
         async createUser(req, res) {
            try {
               
                const jwt = await AuthService.createUser(req.body)
               const authRes = {
                jwt,
                message:"User create successfully",
                role:UserRoles.CUSTOMER
               }
                res.status(200).json(authRes)

            } catch (error) {
                res.status(error instanceof Error ? 404 : 500)
                .json({ message: error.message })
            }
        }

        //singin user
         async signin(req, res) {
            try {               
                const authRes = await AuthService.signin(req.body)
             
                res.status(200).json(authRes)

            } catch (error) {
                res.status(error instanceof Error ? 404 : 500)
                .json({ message: error.message })
            }
        }
        
}

module.exports = new AuthController()