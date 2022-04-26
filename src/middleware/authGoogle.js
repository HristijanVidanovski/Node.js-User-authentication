
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







/*
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('143381467912-9mgbakvdnvmbl7535cj3i7hdv7dcq7of.apps.googleusercontent.com');
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
verify().catch(console.error);*/