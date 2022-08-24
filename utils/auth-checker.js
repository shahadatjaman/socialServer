// TODO: Check header is Available

// TODO: Check 'Bearer' is inclued in headers

const {AuthenticationError} = require('apollo-server-express')

const jwt = require('jsonwebtoken')

const {SECRET_KEY} = require('../config')

module.exports = (context) => {

  const authHeader = context.req.headers.authorization;

  if(authHeader){
      const token = authHeader.split("Bearer ")[1];

      if(token){
        try{
          const user = jwt.verify(token, SECRET_KEY);
          return user
      }catch(error){
          throw new AuthenticationError('Invalid/Expired token')
      }
      }

      throw new AuthenticationError('Authentication token must be /`Bearer [token]')
  }

  throw new AuthenticationError('Authorization Headers must be provid')
}