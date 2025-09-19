const VerificationCode = require("../modal/VerificationCode");
const generateOTP = require("../util/generateOtp");
const sendVerificationEmail = require("../util/sendEmail");
const sellerService = require("./sellerService");

class AuthService {
    async sendLoginOtp(email) {
        const SIGNIN_PREFIX = "signin_"

        if (email.startsWith(SIGNIN_PREFIX)) {
            email=email.substring(SIGNIN_PREFIX.length)
            const seller = await sellerService.getSellerByEmail( email )
            if (!seller) throw new Error("User not found")            
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
}
module.exports = new AuthService()