
const User = require("../modal/UserModal");
const VerificationCode = require("../modal/VerificationCode");
const generateOTP = require("../util/generateOtp");
const sendVerificationEmail = require("../util/sendEmail");
const jwtProvider = require("../util/jwtProvider");
const Seller = require("../modal/Seller");
const Cart = require("../modal/Cart");

class AuthService {
    async sendLoginOtp(email) {
        const SIGNIN_PREFIX = "signin_"

        if (email.startsWith(SIGNIN_PREFIX)) {
            email = email.substring(SIGNIN_PREFIX.length)
            const seller = await Seller.findOne({email})
            const user = await User.findOne({email})
            if (!seller && !user) throw new Error("User not found")
          
        }

        const exitingVerificationCode = await VerificationCode.findOne({ email })
        if (exitingVerificationCode) {
            await VerificationCode.deleteOne({ email })
        }

        const otp = generateOTP()
        const verificationCode = new VerificationCode({ otp, email })
        await verificationCode.save()

        //send email to user
        const subject = "MM Fashion World Login/sign up OTP";
        const body = `Your otp is ${otp}. Please enter it to complete your login`;
        await sendVerificationEmail(email, subject, body)
    }

    // Create User
    async createUser(req) {
        const { email, fullName , otp} = req;
        let user = await User.findOne({ email })

        if (user) {
            throw new Error("User already exists with this email")
        }


        const verificationCode = await VerificationCode.findOne({ email })

        if (!verificationCode || verificationCode.otp !== otp) {
            throw new Error("Invalid OTP")
        }

        user = new User({
            email, 
            fullName
        })
        await user.save();

        const cart = new Cart({ user: user._id })
        await cart.save()

        return jwtProvider.createJwt({ email })
    }

    //sing in
    async signin(req) {
        const { email, otp } = req;

        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("User not found with this email")
        }
        const verificationCode = await VerificationCode.findOne({ email })

        if (!verificationCode || verificationCode.otp !== otp) {
            throw new Error("Invalid OTP")
        }
        return {
            message: "login success",
            jwt: jwtProvider.createJwt({ email }),
            role: user.role
        }
    }
}
module.exports = new AuthService()