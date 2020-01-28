# User Management API

Run the application using "npm run start"
## Runs in pre-configured port 4000

## Default Endpoint For User Mangement

hostName/api/um

## hostName/api/um/register

Register a user in the system

Sample Request:
{
    "email": "ananth1@gmail.com",
    "password": "nullvoid",
    "firstName": "Ananth",
    "lastName": "Prasad",
    "phoneNumber": "9840614023"
}

## hostName/api/um/login

1) To get json web token as response if the user is valid
2) Json web token is set to expire in 2 Min as default
3) Json web token expire can be changed from login function of userManagement.controller.js

Sample Request:
{
    "email": "ananth1@gmail.com",
    "password": "nullvoid"
}