# StackOverflowLite
[![Coverage Status](https://coveralls.io/repos/github/jilhenrywave/StackOverflowLite/badge.svg?branch=develop)](https://coveralls.io/github/jilhenrywave/StackOverflowLite?branch=develop)

StackOverflow-Lite is a platform where users can ask questions and give answers to questions. 

This project is the web-API application written in Javascript using Node.js and Express frameworks for the platform.

# Installation
- Clone Repo
  ```node
  git clone https://github.com/jilhenrywave/StackOverflowLite.git
  ```
- Install Dependencies
  ```node
  npm install
  ```
- Setup dev.env and test.env files as shown below and a sequelize config.json like [this](https://sequelize.org/docs/v6/other-topics/migrations/#configuration).
  ```.env
  PORT=3000
  DB_NAME=DB_NAME
  DB_USERNAME=DB_USERNAME
  DB_PASSWORD=DB_PASSWORD
  DB_HOST=DB_HOST
  JWT_KEY=JWT_SECRET_KEY
  ```
- Run Migrations
  ```node
  npm run migrations
  npm run association-migrations
  ```
- Run the application
  ```node
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
The web-api has a base path `/api/v1`. There are 4 main routes of endpoints as listed below and all communication are in JSON

- `/users`

- `/questions`

- `/answers`

- `/comments`

## Users
## Register User
Create a new user on the application. This returns the new user details and a token.
### Request
` POST /users `
```curlrc
curl --location --request POST 'localhost:3000/api/v1/users/' \
--header 'Content-Type: application/json' \
--data-raw '{"name": "Jil Henry", "email": "jil@henry.com"}' 
```
### Payload
```json
{
    "name": "Jil Henry",
    "email": "jil@henry.com",
    "password": "124756"
}
```

### Response
```json
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

## Login User
Authenticate a user into the application. This returns the authenticated user and a token.
### Request
`POST /users/login`
```curlrc
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"jil@henry.com",
    "password":"124756"
}' 
```
### Payload
```json
{
    "email": "jil@henry.com",
    "password": "124756"
}
```
### Response
```json
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

## Logout User
Logs user instance out of the system.
### Request
`POST /users/logout`
```curlrc
curl --location --request POST 'localhost:3000/api/v1/users/logout' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTk1MywiZXhwIjoxNjY2MjA3OTUzfQ.TuyOb6ETMzYYq1vXqA_qco0HLb5WO1I6h8xOD6Q0PRE'
```
### Response
```json
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

## Logout All User
Logs out all user instance from the application. User will need to login again to access the application.
### Request
`POST /users/logout/all`
```curlrc
curl --location --request POST 'localhost:3000/api/v1/users/logout/all' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTk1MywiZXhwIjoxNjY2MjA3OTUzfQ.TuyOb6ETMzYYq1vXqA_qco0HLb5WO1I6h8xOD6Q0PRE'
```
### Response
```json
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

## Get This User
Get the information of the logged in user.
### Request
`GET /users/me`
```curlrc
curl --location --request GET 'localhost:3000/api/v1/users/me' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ3OTk1MywiZXhwIjoxNjY2MjA3OTUzfQ.TuyOb6ETMzYYq1vXqA_qco0HLb5WO1I6h8xOD6Q0PRE' 
```
### Response
```json
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

## Get User
Get the information of a user. The endpoint is queried using an id.
### Request
`GET /users?id=userId`
```curlrc
curl --location --request GET 'localhost:3000/api/v1/users?id=228a5f5c-7179-4312-b928-7da746f9c8c9' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ4MDY3MCwiZXhwIjoxNjY2MjA4NjcwfQ._dAZnjQBhQ3N1Z2Fk5TEgRXSqD7eR7w53z9cD21c8mk'
```
### Response
```json
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

## Update User
User can edit name, email and password only. Each update is validated to ensure there is no conflict.
### Request
`PATCH /users/me/edit`
```curlrc
curl --location --request PATCH 'localhost:3000/api/v1/users/me/edit' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ4MDY3MCwiZXhwIjoxNjY2MjA4NjcwfQ._dAZnjQBhQ3N1Z2Fk5TEgRXSqD7eR7w53z9cD21c8mk' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Andrew Lee"
}' 
```
### Payload

```json
{
    "name": "Andrew Lee"
}
```
### Response
```json
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 89

{
    "id": "228a5f5c-7179-4312-b928-7da746f9c8c9",
    "name": "Andrew Lee",
    "email": "jil@henry.com"
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Delete User
Remove user from the system. This invalidates all user tokens.
### Request
`DELETE /users/me`
```curlrc
curl --location --request DELETE 'localhost:3000/api/v1/users/me' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyOGE1ZjVjLTcxNzktNDMxMi1iOTI4LTdkYTc0NmY5YzhjOSIsImlhdCI6MTY2NDQ4MDY3MCwiZXhwIjoxNjY2MjA4NjcwfQ._dAZnjQBhQ3N1Z2Fk5TEgRXSqD7eR7w53z9cD21c8mk'
```
### Response
```json
HTTP/1.1 204 No Content
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 204 No Content
Connection: keep-alive
Content-Type: application/json
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Questions
## Post Question
Create a new question.
### Request
`POST /questions`
```curlrc
curl --location --request POST 'localhost:3000/api/v1/questions' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkYzc1YTc3LWFmMGYtNDhjMy05ZmRjLTA5OTJhODVkYWRlZSIsImlhdCI6MTY2NDQ4MTM2NSwiZXhwIjoxNjY2MjA5MzY1fQ.CvIMUenD9nNWZSfsqpTIFl05mfypNvFAzsScQFWV_20' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"My Question",
    "body": "Question Body"
}'
```
### Payload
```json
{
    "title":"My Question",
    "body": "Question Body"
}
```
### Response
```json
HTTP/1.1 201 Created
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 201 Created
Connection: keep-alive
Content-Type: application/json
Content-Length: 163

{
    "id": "f0d11212-ae90-4c3b-9e59-6e7680d9379c",
    "title": "My Question",
    "body": "Question Body",
    "owner": {
        "id": "0dc75a77-af0f-48c3-9fdc-0992a85dadee",
        "name": "Jil Henry"
    }
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Get Questions
It supports the following queries;

- `ownerId=0dc75a77-af0f-48c3-9fdc-0992a85dadee`
- `page=1`
- `limit=2`
- `sort=title_asc|title_desc|answer_asc|answer_desc`
- `search=some-title`

### Request
`GET /questions`
```curlrc
curl --location --request GET 'localhost:3000/api/v1/questions?page=2&limit=3'
```
### Response
```json
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 942

{
    "count": 3,
    "totalCount": 10,
    "previous": "http://localhost:3000/api/v1/questions?page=1&limit=3",
    "next": "http://localhost:3000/api/v1/questions?page=3&limit=3",
    "questions": [
        {
            "id": "91d3a0eb-4861-4b1e-ab7a-baa7e7d2d9e4",
            "title": "Arm-2",
            "body": "Arm strong",
            "createdAt": "2022-09-29T01:33:11.000Z",
            "modifiedAt": "2022-09-29T01:33:11.000Z",
            "owner": {
                "id": "e1fd3db2-3867-46da-9917-46a29471d7f9",
                "name": "Arm Strong"
            },
            "answers": {
                "count": 0
            }
        },...]
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Get Logged-in User Questions
Retrieves all the questions of the logged-in user. It supports pagination and the following queries;

- `page=1`
- `limit=2`
- `sort=title_asc|title_desc|answer_asc|answer_desc`
- `search=some-title`

### Request
`GET /questions/me`
```curlrc
curl --location --request GET 'localhost:3000/api/v1/questions/me' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkYzc1YTc3LWFmMGYtNDhjMy05ZmRjLTA5OTJhODVkYWRlZSIsImlhdCI6MTY2NDQ4MTM2NSwiZXhwIjoxNjY2MjA5MzY1fQ.CvIMUenD9nNWZSfsqpTIFl05mfypNvFAzsScQFWV_20' 
```
### Response
```json
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 305

{
    "count": 1,
    "totalCount": 1,
    "questions": [
        {
            "id": "f0d11212-ae90-4c3b-9e59-6e7680d9379c",
            "title": "My Question",
            "body": "Question Body",
            "createdAt": "2022-09-29T19:56:30.000Z",
            "modifiedAt": "2022-09-29T19:56:30.000Z",
            "owner": {
                "id": "0dc75a77-af0f-48c3-9fdc-0992a85dadee",
                "name": "Jil Henry"
            },
            "answers": {
                "count": 0
            }
        }
    ]
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Get Question
Retrieve a single question by id.
### Request
`GET questions/:questionId`
```curlrc
curl --location --request GET 'localhost:3000/api/v1/questions/771624ff-d37c-4768-a6da-2098ae819846'
```
### Response
```json
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 256

{
    "id": "771624ff-d37c-4768-a6da-2098ae819846",
    "title": "Arm-1",
    "body": "Arm strong",
    "createdAt": "2022-09-29T01:33:05.000Z",
    "modifiedAt": "2022-09-29T01:33:05.000Z",
    "owner": {
        "id": "e1fd3db2-3867-46da-9917-46a29471d7f9",
        "name": "Arm Strong"
    },
    "answers": {
        "count": 0
    }
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Update Question
Update a user question. This endpoint validates the user to enusre they have edit rights.
### Request
`PATCH /questions/:questionId/edit`
```curlrc
curl --location --request PATCH 'localhost:3000/api/v1/questions/f0d11212-ae90-4c3b-9e59-6e7680d9379c/edit' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkYzc1YTc3LWFmMGYtNDhjMy05ZmRjLTA5OTJhODVkYWRlZSIsImlhdCI6MTY2NDQ4MTM2NSwiZXhwIjoxNjY2MjA5MzY1fQ.CvIMUenD9nNWZSfsqpTIFl05mfypNvFAzsScQFWV_20' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"This is an update"
}'
```
### Payload
```json
{
    "title":"This is an update"
}
```
### Response
```json
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 270

{
    "id": "f0d11212-ae90-4c3b-9e59-6e7680d9379c",
    "title": "This is an update",
    "body": "Question Body",
    "createdAt": "2022-09-29T19:56:30.000Z",
    "modifiedAt": "2022-09-29T20:15:14.000Z",
    "owner": {
        "id": "0dc75a77-af0f-48c3-9fdc-0992a85dadee",
        "name": "Jil Henry"
    },
    "answers": {
        "count": 0
    }
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Delete Question
Remove a question from the system. All answers and comments are removed as well.
### Request
`DELETE /questions/:questionId
```curlrc
curl --location --request DELETE 'localhost:3000/api/v1/questions/f0d11212-ae90-4c3b-9e59-6e7680d9379c' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkYzc1YTc3LWFmMGYtNDhjMy05ZmRjLTA5OTJhODVkYWRlZSIsImlhdCI6MTY2NDQ4MTM2NSwiZXhwIjoxNjY2MjA5MzY1fQ.CvIMUenD9nNWZSfsqpTIFl05mfypNvFAzsScQFWV_20' 
```
### Response
```json
HTTP/1.1 204 No Content
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 204 No Content
Connection: keep-alive
Content-Type: application/json
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Delete All Questions
Remove all the questions of a user. All answers and comments are removed as well.
### Request
`DELETE /questions/delete/all`
```curlrc
curl --location --request DELETE 'localhost:3000/api/v1/questions/delete/all' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkYzc1YTc3LWFmMGYtNDhjMy05ZmRjLTA5OTJhODVkYWRlZSIsImlhdCI6MTY2NDQ4MTM2NSwiZXhwIjoxNjY2MjA5MzY1fQ.CvIMUenD9nNWZSfsqpTIFl05mfypNvFAzsScQFWV_20' 
```
### Response
```json
HTTP/1.1 204 No Content
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 204 No Content
Connection: keep-alive
Content-Type: application/json
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Answers
## Post Answer
Create an answer for a question.
### Request
`POST /questions/:questionId/answers`
```curlrc
curl --location --request POST 'localhost:3000/api/v1/questions/4b5e7ef2-7f72-4b00-8d26-32a0266dd735/answers' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZmQzZGIyLTM4NjctNDZkYS05OTE3LTQ2YTI5NDcxZDdmOSIsImlhdCI6MTY2NDQ4Mjk4MiwiZXhwIjoxNjY2MjEwOTgyfQ.P8WTYmeok6X0Yj9Wsv2xz5PI5ugQeuDdcQOXgzU-YTU' \
--header 'Content-Type: application/json' \
--data-raw '{
    "answer": "This is arm-9 answer"
}' 
```
### Payload
```json
{
    "answer": "This is arm-9 answer"
}
```
### Response
```json
HTTP/1.1 201 Created
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 201 Created
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "id": "9d821c46-b430-421c-a7db-3167e6d55842",
    "body": "This is arm-9 answer",
    "votes": 0,
    "questionId": "4b5e7ef2-7f72-4b00-8d26-32a0266dd735",
    "user": {
        "id": "e1fd3db2-3867-46da-9917-46a29471d7f9",
        "name": "Arm Strong"
    }
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Get Logged-in User Answers
It supports pagination and the following queries;

- `page=1`
- `limit=2`
- `sort=votes_asc|votes_desc`

### Request
` GET /answers/me `
```curlrc
curl --location --request GET 'localhost:3000/api/v1/answers/me?limit=3&page=2' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZmQzZGIyLTM4NjctNDZkYS05OTE3LTQ2YTI5NDcxZDdmOSIsImlhdCI6MTY2NDQ4Mjk4MiwiZXhwIjoxNjY2MjEwOTgyfQ.P8WTYmeok6X0Yj9Wsv2xz5PI5ugQeuDdcQOXgzU-YTU' 
```
### Response
```json
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "count": 3,
    "totalCount": 10,
    "previous": "http://localhost:3000/api/v1/answers/me?limit=3&page=1",
    "next": "http://localhost:3000/api/v1/answers/me?limit=3&page=3",
    "answers": [
        {
            "id": "437120d9-019c-4f4b-a800-586313142148",
            "body": "This is arm-6 answer",
            "votes": 0,
            "questionId": "4b5e7ef2-7f72-4b00-8d26-32a0266dd735",
            "createdAt": "2022-09-29T02:34:40.000Z",
            "modifiedAt": "2022-09-29T02:34:40.000Z",
            "owner": {
                "id": "e1fd3db2-3867-46da-9917-46a29471d7f9",
                "name": "Arm Strong"
            },
            "question": {
                "answerId": null
            }
        },
      ...]
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Get Answers to a Question
It supports pagination and the following queries;

- ` page=1 `
- ` limit=2 `
- ` sort=votes_asc|votes_desc `

### Request
` GET /questions/:questionId/answers `
```curlrc
curl --location --request GET 'localhost:3000/api/v1/questions/4b5e7ef2-7f72-4b00-8d26-32a0266dd735/answers?limit=5'
```
### Response
```json
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "count": 5,
    "totalCount": 10,
    "next": "http://localhost:3000/api/v1/questions/4b5e7ef2-7f72-4b00-8d26-32a0266dd735/answers?limit=5&page=2",
    "answers": [
        {
            "id": "1d247e46-eed7-4c96-bc43-f8f81647281a",
            "body": "This is arm-1 answer",
            "votes": 0,
            "questionId": "4b5e7ef2-7f72-4b00-8d26-32a0266dd735",
            "createdAt": "2022-09-29T02:34:20.000Z",
            "modifiedAt": "2022-09-29T02:34:20.000Z",
            "owner": {
                "id": "e1fd3db2-3867-46da-9917-46a29471d7f9",
                "name": "Arm Strong"
            },
            "question": {
                "answerId": null
            }
        },
     ...]
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Accept/Reject Answer
Accept or reject an accepted answer to a question. Only the owner of the question can perform this action.
### Request
`POST /answers/:answerId/accept|reject`
```curlrc
curl --location --request POST 'localhost:3000/api/v1/answers/65966a1a-a7c9-4bca-beb1-699d0308262f/accept' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZmQzZGIyLTM4NjctNDZkYS05OTE3LTQ2YTI5NDcxZDdmOSIsImlhdCI6MTY2NDQ4Mjk4MiwiZXhwIjoxNjY2MjEwOTgyfQ.P8WTYmeok6X0Yj9Wsv2xz5PI5ugQeuDdcQOXgzU-YTU' 
```
### Response
```json
HTTP/1.1 204 No Content
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 204 No Content
Connection: keep-alive
Content-Type: application/json
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Vote Answer
It supports the following queries;

- `type=down_vote|up_vote`

**Users are not allowed to vote twice**

### Request
`POST /answers/:answerId/vote?type=down_vote`
```curlrc
curl --location --request POST 'localhost:3000/api/v1/answers/65966a1a-a7c9-4bca-beb1-699d0308262f/vote?type=down_vote' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZmQzZGIyLTM4NjctNDZkYS05OTE3LTQ2YTI5NDcxZDdmOSIsImlhdCI6MTY2NDQ4Mjk4MiwiZXhwIjoxNjY2MjEwOTgyfQ.P8WTYmeok6X0Yj9Wsv2xz5PI5ugQeuDdcQOXgzU-YTU'
```
### Response
```json
HTTP/1.1 204 No Content
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 204 No Content
Connection: keep-alive
Content-Type: application/json
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Unvote Answer
It supports the following queries;

- `type=down_vote|up_vote`

**The user must have casted a vote to be able to remove it.**

### Request
`POST /answers/:answerId/vote/reject?type=down_vote`
```curlrc
curl --location --request POST 'localhost:3000/api/v1/answers/65966a1a-a7c9-4bca-beb1-699d0308262f/vote/reject?type=down_vote' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZmQzZGIyLTM4NjctNDZkYS05OTE3LTQ2YTI5NDcxZDdmOSIsImlhdCI6MTY2NDQ4Mjk4MiwiZXhwIjoxNjY2MjEwOTgyfQ.P8WTYmeok6X0Yj9Wsv2xz5PI5ugQeuDdcQOXgzU-YTU'
```
### Response
```json
HTTP/1.1 204 No Content
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 204 No Content
Connection: keep-alive
Content-Type: application/json
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Update Answer
Update the answer of a question
### Request
`PATCH /answers/:answerId/edit`
```curlrc
curl --location --request PATCH 'localhost:3000/api/v1/answers/65966a1a-a7c9-4bca-beb1-699d0308262f/edit' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZmQzZGIyLTM4NjctNDZkYS05OTE3LTQ2YTI5NDcxZDdmOSIsImlhdCI6MTY2NDQ4Mjk4MiwiZXhwIjoxNjY2MjEwOTgyfQ.P8WTYmeok6X0Yj9Wsv2xz5PI5ugQeuDdcQOXgzU-YTU' \
--header 'Content-Type: application/json' \
--data-raw '{
    "answer": "This is an updated answer"
}' 
```
### Payload
```json
{
    "answer": "This is an updated answer"
}
```
### Response
```json
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "id": "65966a1a-a7c9-4bca-beb1-699d0308262f",
    "body": "This is an updated answer",
    "votes": -1,
    "questionId": "4b5e7ef2-7f72-4b00-8d26-32a0266dd735",
    "createdAt": "2022-09-29T02:34:29.000Z",
    "modifiedAt": "2022-09-29T20:37:51.000Z",
    "owner": {
        "id": "e1fd3db2-3867-46da-9917-46a29471d7f9",
        "name": "Arm Strong"
    },
    "question": {
        "answerId": "65966a1a-a7c9-4bca-beb1-699d0308262f"
    }
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Delete Answer
Remove an answer from the system. This removes all comments as well.
### Request
`DELETE /answers/:answerId`
```curlrc
curl --location --request DELETE 'localhost:3000/api/v1/answers/65966a1a-a7c9-4bca-beb1-699d0308262f' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZmQzZGIyLTM4NjctNDZkYS05OTE3LTQ2YTI5NDcxZDdmOSIsImlhdCI6MTY2NDQ4Mjk4MiwiZXhwIjoxNjY2MjEwOTgyfQ.P8WTYmeok6X0Yj9Wsv2xz5PI5ugQeuDdcQOXgzU-YTU' 
```
### Response
```json
HTTP/1.1 204 No Content
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 204 No Content
Connection: keep-alive
Content-Type: application/json
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Comments
## Post Comment
Post a comment to an answer
### Request
`POST /answers/:answerId/comments`
```curlrc
curl --location --request POST 'localhost:3000/api/v1/answers/5607f413-510d-4b20-8a3a-0f79f62b1da7/comments' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZmQzZGIyLTM4NjctNDZkYS05OTE3LTQ2YTI5NDcxZDdmOSIsImlhdCI6MTY2NDQ4Mjk4MiwiZXhwIjoxNjY2MjEwOTgyfQ.P8WTYmeok6X0Yj9Wsv2xz5PI5ugQeuDdcQOXgzU-YTU' \
--header 'Content-Type: application/json' \
--data-raw '{
    "comment":"This is comment 6"
}' 
```
### Payload
```json
{
    "comment":"This is comment 6"
}
```
### Response
```json
HTTP/1.1 201 Created
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 201 Created
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "id": "47cdc794-7cff-4279-8a99-ada5dff9371b",
    "body": "This is comment 6",
    "answerId": "5607f413-510d-4b20-8a3a-0f79f62b1da7",
    "owner": {
        "id": "e1fd3db2-3867-46da-9917-46a29471d7f9",
        "name": "Arm Strong"
    }
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Get Comments of an Answer
It supports pagination and the following queries;

- `page=1`
- `limit=3`

### Request
`GET /answers/:answerId/comments`
```curlrc
curl --location --request GET 'localhost:3000/api/v1/answers/5607f413-510d-4b20-8a3a-0f79f62b1da7/comments?limit=3'
```
### Response
```json
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "count": 3,
    "totalCount": 6,
    "next": "http://localhost:3000/api/v1/answers/5607f413-510d-4b20-8a3a-0f79f62b1da7/comments?limit=3&page=2",
    "comments": [
        {
            "id": "09027f96-69f8-4386-9caf-c86312dd0065",
            "body": "This is comment 5",
            "answerId": "5607f413-510d-4b20-8a3a-0f79f62b1da7",
            "createdAt": "2022-09-29T20:41:44.000Z",
            "modifiedAt": "2022-09-29T20:41:44.000Z",
            "owner": {
                "id": "e1fd3db2-3867-46da-9917-46a29471d7f9",
                "name": "Arm Strong"
            }
        },
      ...]
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Update a Comment
Update a comment. The comment must belong to the logged in user
### Request
`PATCH /comments/:commentId/edit`
```curlrc
curl --location --request PATCH 'localhost:3000/api/v1/comments/09027f96-69f8-4386-9caf-c86312dd0065/edit' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZmQzZGIyLTM4NjctNDZkYS05OTE3LTQ2YTI5NDcxZDdmOSIsImlhdCI6MTY2NDQ4Mjk4MiwiZXhwIjoxNjY2MjEwOTgyfQ.P8WTYmeok6X0Yj9Wsv2xz5PI5ugQeuDdcQOXgzU-YTU' \
--header 'Content-Type: application/json' \
--data-raw '{
    "comment":"This is an updated comment"
}'
```
### Payload
```json
{
    "comment":"This is an updated comment"
}
```
### Response
```json
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: keep-alive
Content-Type: application/json
Content-Length: 295

{
    "id": "09027f96-69f8-4386-9caf-c86312dd0065",
    "body": "This is an updated comment",
    "answerId": "5607f413-510d-4b20-8a3a-0f79f62b1da7",
    "createdAt": "2022-09-29T20:41:44.000Z",
    "modifiedAt": "2022-09-29T20:47:00.000Z",
    "owner": {
        "id": "e1fd3db2-3867-46da-9917-46a29471d7f9",
        "name": "Arm Strong"
    }
}
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

## Delete a Comment
Remove a comment from the application.
### Request
`DELETE /comments/:commentId`
```curlrc
curl --location --request DELETE 'localhost:3000/api/v1/comments/09027f96-69f8-4386-9caf-c86312dd0065' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZmQzZGIyLTM4NjctNDZkYS05OTE3LTQ2YTI5NDcxZDdmOSIsImlhdCI6MTY2NDQ4Mjk4MiwiZXhwIjoxNjY2MjEwOTgyfQ.P8WTYmeok6X0Yj9Wsv2xz5PI5ugQeuDdcQOXgzU-YTU'
```
### Response
```json
HTTP/1.1 204 No Content
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 204 No Content
Connection: keep-alive
Content-Type: application/json
```

[back to the top](https://github.com/jilhenrywave/StackOverflowLite#stackoverflowlite) :point_up_2:

# License
All code is licensed under Flutterwave
