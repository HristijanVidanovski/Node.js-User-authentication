
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client('143381467912-9mgbakvdnvmbl7535cj3i7hdv7dcq7of.apps.googleusercontent.com')
const authGoogle= async (req, res, next) => {
    const googleToken = req.header("Bearer")//token from google auth
        try{
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: '143381467912-9mgbakvdnvmbl7535cj3i7hdv7dcq7of.apps.googleusercontent.com', 
            })
            const payload = ticket.getPayload();
            const userid = payload['sub'];      
            req.user = payload
        } catch(e) {
            req.message = 'Cannot sign in with google'
        }
    next()
}
module.exports = authGoogle






