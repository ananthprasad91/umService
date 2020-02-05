const User = require('../models/User')

async function checkEmailExist(email) {
  try {
    return User.findOne({ email })
  } catch (e) {
    throw e
  }
}

async function register(userObj) {
  try {
    const newUser = new User(userObj)
    return newUser.save()
  } catch (e) {
    throw e
  }
}

async function login() {
  try {
    //Login Function
    return "Login Success"
  } catch (e) {
    throw e
  }
}

async function resetPassword() {
  try {
    //reset Password Function
    return "Reset Password Success"
  } catch (e) {
    throw e
  }
}

async function changePassword() {
  try {
    //change Password Function
    return "Change Password Success"
  } catch (e) {
    throw e
  }
}

module.exports = {
  register,
  login,
  resetPassword,
  changePassword,
  checkEmailExist
}
