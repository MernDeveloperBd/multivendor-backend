const jwt = require('jsonwebtoken');

const secretKey ="bd55bd1981e39fbf904dd7a2a713f6096def73645caa996da9f55e530eaf56f5"

class JwtProvider{
    constructor(secretKey){
        this.secretKey=secretKey
    }
    createJwt(payload){
        return jwt.sign(payload, this.secretKey, {expiresIn:"7d"})
    }

    getEmailFromjwt(token){
        try {
            const decodedToken = jwt.verify(token, this.secretKey);
            return decodedToken.email;
        } catch (error) {
            throw new Error("Invalid token")
        }
    }
    verifyJwt(token){
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error("Invalid token")
        }
    }
}

module.exports = new JwtProvider(secretKey);