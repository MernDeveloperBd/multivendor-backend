const User = require("../modal/UserModal");
const jwtProvider = require("../util/jwtProvider");

class UserService{
    async findUserProfileByJwt(jwt){
         const email = jwtProvider.getEmailFromjwt(jwt)

         const user = await User.findOne({email})
           if(!user){
            throw new Error(`User does not exists with this ${email}`)
        }
        return user
    }

      async findUserByEmail(email){        
            const user = await User.findOne({email})
            if(!user){
               throw new (`User does not exists with this ${email}`)
            }
            return user;
        }
}

module.exports = UserService;