const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/index')
const { connectDB } = require('./utils/mongodb')
const { resourceNotFound, accessDenied } = require('./controllers/userManagement.controller')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

const app = express()

//DB Config
const db = require('./config/keys').MongoURI

//Connect To Mongo
connectDB(db)

//Log
app.use(logger('dev'))

//CORS
app.use(cors())

//BodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({strict: false}))

app.use(cookieParser())


//Swagger Documentation
app.use('/api/um/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/um', userRoutes)

app.use('/api/*', resourceNotFound)

app.use('*', accessDenied)

app.listen(4000, () => console.log('app listening on port 4000'))

module.exports = app
