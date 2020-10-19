# Express Mongo JWT Boilerplate [![Build Status](https://travis-ci.org/kasvith/express-mongo-jwt-boilerplate.svg?branch=master)](https://travis-ci.org/kasvith/express-mongo-jwt-boilerplate)

## Installation

- Install NodeJS, MongoDB
- Install `npm` or `yarn`
- Rename `.env.example` to `.env`
- Fulfill `.env` data
- Start MongoDB
- Run `yarn run dev` or `npm run dev`
- Check `http://localhost:3000/api/status` to see it works

## With Docker

- Make sure you have installed `Docker` and `Docker Compose`
- Just run `docker-compose up` to start the server

## Configuration

| Name                 | Description                                                                           | Example                              |
|----------------------|---------------------------------------------------------------------------------------|--------------------------------------|
| NODE_ENV             | Environment for node js                                                               | "dev", "prod", "test"                |
| APP                  | Name of the application                                                               | My cool express app                  |
| PORT                 | Port to run the application (if you run in **heroku** this will setup  automatically) | 3000                                 |
| HOSTNAME             | Host name for running the application                                                 | http://localhost:3000                |
| APP_SECRET           | Secret for running app. Use a strong hash in production and make sure to rotate it    | ddd36434-80fe-4f18-b3b6-e645697f7b84 |
| MONGOURI             | MongoDB connection URI                                                                | mongodb://localhost:27017/yourapp    |
| MONGOTESTURI         | MongoDB connection URI for testing                                                    | mongodb://localhost:27017/test-app   |
| TRANSPORTER_HOST     | Mail server host                                                                      | smtp.mymailer.com                    |
| TRANSPORTER_PORT     | Mail server port                                                                      | 2525                                 |
| TRANSPORTER_USERNAME | Mail server username                                                                  | harrypotter                          |
| TRANSPORTER_PASSWORD | Mail server password                                                                  | alohomora                            |
