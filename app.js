const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const userRoutes = require('./routes/index')
const { connectDB } = require('./utils/mongodb')
const { resourceNotFound, accessDenied } = require('./controllers/userManagement.controller')
const swaggerDocument = YAML.load('./docs/swagger.yaml');

const DATA = [ // should be a database or something persistant
    {email:"test@gmail.com", password:"1234"}, // user data from email-password
    {email:"test2@gmail.com", provider:"facebook"} // user data from OAuth has no password
  ]

const app = express()

//DB Config
const db = require('./config/keys').MongoURI

//Connect To Mongo
connectDB(db)

//Log
app.use(logger())

//CORS
app.use(cors())

//BodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ strict: false }))

app.use(cookieParser())


//Swagger Documentation
app.use('/api/um/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/um', userRoutes)

app.use('/api/*', resourceNotFound)

app.use('*', accessDenied)

app.listen(4000, () => console.log('app listening on port 4000'))

module.exports = app
