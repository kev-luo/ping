const OauthUser = require('../models/OauthUser');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

const findOrCreateUser = async(token) => {
  const googleUser = await verifyAuthToken(token);
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