const { AuthenticationError } = require('apollo-server');

const authenticated = next => (parent, args, context, info) => {
  if(!context.currentUser) {
    throw new AuthenticationError('You must be logged in');
  }
  return next(parent, args, context, info);
}

module.exports = {
  Query: {
    me: authenticated((parent, args, context) => context.currentUser)
  }
}