const OauthUser = require('../models/OauthUser');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

const findOrCreateUser = async(token) => {
  const googleUser = await verifyAuthToken(token);
  const user = await checkIfUserExists(googleUser.email);
  return user ? user : createNewUser(googleUser);
}

const verifyAuthToken = async(token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    })
    return ticket.getPayload();
  } catch(err) {
    console.error('Error verifying auth token', err);
  }
}

const checkIfUserExists = async(email) => await OauthUser.findOne({ email }).exec();

const createNewUser = googleUser => {
  const { name, email, picture } = googleUser;
  const oauthUser = { name, email, picture };
  return new OauthUser(oauthUser).save();
}

module.exports = findOrCreateUser;