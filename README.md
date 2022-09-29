# StackOverflowLite
[![Coverage Status](https://coveralls.io/repos/github/jilhenrywave/StackOverflowLite/badge.svg?branch=develop)](https://coveralls.io/github/jilhenrywave/StackOverflowLite?branch=develop)

StackOverflow-Lite is a platform where users can ask questions and give answers to questions. 

This project is the web-API application written in Javascript using Node.js and Express frameworks for the platform.

# Installation
Clone Repo //add link here
Install Dependencies
Setup dev.env and test.env files in config and a config.json for sequelize migration
Run Migrations
Run the application 
Visit endpoints a4 localhost 3000 see endpoints documentation below

# Technology Stack
- Framework: [Node](https://nodejs.org/en/docs/)/[Express](https://expressjs.com/)
- ORM: [Sequelize](https://sequelize.org/docs/v6/getting-started/)
- Database: [MySQL(5.7)](https://dev.mysql.com/downloads/mysql/5.7.html)
- Linting Library: [ESLint](https://eslint.org/docs/latest/user-guide/getting-started)
- Style Guide:[Airbnb](https://github.com/airbnb/javascript)
- Testing Framework: [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/)
- Coverage Report Framework: [NYC Istanbul](https://istanbul.js.org/)


# API Documentation
The web-api has a base path /api/v1. and is divided into 4 main routes
/users
/questions
/answers
/comments

## Users
### Register User
This endpoint takes a payload and adds the user to the system.
#### Payload
```
{
    "name": "Jil Henry",
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Request
`POST /`


``` curl --location --request POST 'localhost:3000/api/v1/users/' --header 'Content-Type: application/json' --data-raw '{"name": "Jil Henry", "email": "jil@henry.com"}' ```
#### Response
```
HTTP/1.1 201 Created
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 201 Created
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3MDA1NywiZXhwIjoxNjY2MTk4MDU3fQ.OGd1bcvckWTbaHln3tzYVwPw6HfWu9X0MBddhTNoV8M"
}
```
#### Error Codes
409 - RequestError: Duplicate Email


400 - ValidationError: Missing or Invalid Request Payload Parameter


500 - ServerError