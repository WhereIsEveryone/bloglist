require('dotenv').config()

let PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test' 
? process.env.TEST_MONGODB_URI
: process.env.MONGODB_URI

const PSW_MIN_LENGTH = process.env.PSW_MIN_LENGTH

module.exports = {
  MONGODB_URI,
  PORT,
  PSW_MIN_LENGTH
}