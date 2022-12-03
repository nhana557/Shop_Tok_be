const jwt = require('jsonwebtoken')
const generateToken = (payload) =>{
    const verifyOpts = { 
      expiresIn: '7day',
      issuer: 'tokoku' 
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyOpts)
      return token;
}

const generateRefreshToken = (payload)=>{
  const verifyOpts = { expiresIn: '28day' }
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyOpts)
  return token;
}
 
module.exports = {generateToken, generateRefreshToken}