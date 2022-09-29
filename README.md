# StackOverflowLite
[![Coverage Status](https://coveralls.io/repos/github/jilhenrywave/StackOverflowLite/badge.svg?branch=develop)](https://coveralls.io/github/jilhenrywave/StackOverflowLite?branch=develop)

StackOverflow-Lite is a platform where users can ask questions and give answers to questions. 

This project is the web-API application written in Javascript using Node.js and Express frameworks for the platform.

# Installation
- Clone Repo
  ```
  git clone https://github.com/jilhenrywave/StackOverflowLite.git
  ```
- Install Dependencies
  ```
  npm install
  ```
- Setup dev.env and test.env files as shown below and a sequelize config.json like [this](https://sequelize.org/docs/v6/other-topics/migrations/#configuration).
  ```
  PORT=3000
  DB_NAME=DB_NAME
  DB_USERNAME=DB_USERNAME
  DB_PASSWORD=DB_PASSWORD
  JWT_KEY=JWT_SECRET_KEY
  ```
- Run Migrations
  ```
  npm run migrations
  npm run association-migrations
  ```
- Run the application
  ```
  npm start
  ```
- See api documentation below.

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

# Technology Stack
- Framework: [Node](https://nodejs.org/en/docs/) and [Express](https://expressjs.com/)
- ORM: [Sequelize](https://sequelize.org/docs/v6/getting-started/)
- Database: [MySQL(5.7)](https://dev.mysql.com/downloads/mysql/5.7.html)
- Linting Library: [ESLint](https://eslint.org/docs/latest/user-guide/getting-started)
- Style Guide:[Airbnb](https://github.com/airbnb/javascript)
- Testing Framework: [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/)
- Coverage Report Framework: [NYC Istanbul](https://istanbul.js.org/)

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

# API Documentation
The web-api has a base path `/api/v1` and is divided into 4 main routes

`/users`

`/questions`

`/answers`

`/comments`

## Users
### Register User
#### Request
`POST /users`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/' \
--header 'Content-Type: application/json' \
--data-raw '{"name": "Jil Henry", "email": "jil@henry.com"}' 
```
#### Payload
```
{
    "name": "Jil Henry",
    "email": "jil@henry.com",
    "password": "124756"
}
```
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

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Logout User
#### Request
`POST /users/logout`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/logout' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTk1MywiZXhwIjoxNjY2MjA3OTUzfQ.TuyOb6ETMzYYq1vXqA_qco0HLb5WO1I6h8xOD6Q0PRE'
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 42

{
    "message": "User successfully logged out"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Logout All User
#### Request
`POST /users/logout/all`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/logout/all' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTk1MywiZXhwIjoxNjY2MjA3OTUzfQ.TuyOb6ETMzYYq1vXqA_qco0HLb5WO1I6h8xOD6Q0PRE'
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 42

{
    "message": "User successfully logged out"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Get This User
#### Request
`GET /users/me`
``` 
curl --location --request GET 'localhost:3000/api/v1/users/me' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTk1MywiZXhwIjoxNjY2MjA3OTUzfQ.TuyOb6ETMzYYq1vXqA_qco0HLb5WO1I6h8xOD6Q0PRE' 
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ4MDY3MCwiZXhwIjoxNjY2MjA4NjcwfQ._dAZnjQBhQ3N1Z2Fk5TEgRXSqD7eR7w53z9cD21c8mk"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Get User
#### Request
`GET /users?id=228a5f5c-7179-4312-b928-7da746f9c8c9`
``` 
curl --location --request GET 'localhost:3000/api/v1/users?id=228a5f5c-7179-4312-b928-7da746f9c8c9' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ4MDY3MCwiZXhwIjoxNjY2MjA4NjcwfQ._dAZnjQBhQ3N1Z2Fk5TEgRXSqD7eR7w53z9cD21c8mk'
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 88

{
    "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
    "name": "Jil Henry",
    "email": "jil@henry.com"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

### Login User
#### Request
`POST /users/login`
``` 
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
#### Payload
```
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
#### Response
```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "user": {
        "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
        "name": "Jil Henry",
        "email": "jil@henry.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTc0NSwiZXhwIjoxNjY2MjA3NzQ1fQ.P3doFqYRLJ-mRn95ifx9hYgIYy9khDKFd_lWd6O3w-o"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:
