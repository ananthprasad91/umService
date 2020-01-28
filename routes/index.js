const express = require('express')
const router = express.Router()
const userController = require('../controllers/userManagement.controller')

router.post('/register', userController.registerUser)
router.post('/login', userController.login)

module.exports = router
