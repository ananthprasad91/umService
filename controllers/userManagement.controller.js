/* eslint-disable strict */
const userManagementService = require("../services/userManagement.service")
const userValidation = require('../validation/userManagement.validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/keys')

async function registerUser(req, res) {

  const { email, firstName, lastName, phoneNumber } = req.body

  try {
    //Validate Request Data
    const error = userValidation.registerValidation(req.body)
    if (error) {
      res.status(400).send({ message: error.details[0].message })
    }
    //Check If User Already Exist
    const emailExist = await userManagementService.checkEmailExist(email)
    if (emailExist) {
      return res.status(400)
        .send({ message: "Email Already Exist" })
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    //Create New User If Valid
    const users = await userManagementService.register({
      email,
      password,
      firstName,
      lastName,
      phoneNumber
    })
    const message = users.email + " Is Registered Successfully"
    return res.status(201)
      .send({ message })
  } catch (e) {
    return res.status(500)
      .send(e)
  }
}

async function login(req, res) {
  const { email, password } = req.body

  try {
    //Validate Request Data
    const error = userValidation.loginValidation(req.body)
    if (error) {
      return res.status(400).send({ message: error.details[0].message })
    }
    //Check User Exist In The System
    const user = await userManagementService.checkEmailExist(email)
    if (!user) {
      return res.status(400)
        .send({ message: "Your Email Id Doesn't Exist" })
    }
    //Authenticate Password
    const validPass = await bcrypt.compare(password, user.password)
    if (!validPass) {
      return res.status(400)
        .send({ message: "Your Email or Password is Invalid" })
    }
    else {
      //If Valid Password Generate Token
      const token = await jwt.sign({ _id: user._id }, SECRET, { expiresIn: '1d' })
      if (token) {
        return res.header('auth-token', token)
          .send({ token: token })
      }
    }
  } catch (e) {
    res.status(500).send(e)
  }
}

async function resourceNotFound(req, res) {

  try {
    //Default Route
    return res.status(404)
      .send({ message: "Resources your looking for is not available" })
  } catch (e) {
    res.status(500).send(e)
  }
}

async function accessDenied(req, res) {

  try {
    //Access Denied
    return res.status(401)
      .send({ message: "You're not auhtorized. Please check API end point" })
  } catch (e) {
    res.status(500).send(e)
  }
}

module.exports = {
  registerUser,
  login,
  resourceNotFound,
  accessDenied
}
