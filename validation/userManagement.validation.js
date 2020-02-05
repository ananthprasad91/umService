const Joi = require('joi')

const registerValidation = (userData) => {
    const registerSchema = {
        email: Joi.string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } ),
        password: Joi.string()
            .required()
            .min(6),
        firstName: Joi.string()
            .required(),
        lastName: Joi.string()
            .required(),
        phoneNumber: Joi.string()
            .required()
    }
    return Joi.validate(userData, registerSchema ).error
}
const loginValidation = (loginData) => {
    const loginSchema = {
        email: Joi.string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } ),
        password: Joi.string()
            .required()
            .min(6)
    }
    return Joi.validate(loginData, loginSchema ).error
}

module.exports = {
    registerValidation,
    loginValidation
}