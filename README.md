# Express Mongo JWT Boilerplate [![Build Status](https://travis-ci.org/kasvith/express-mongo-jwt-boilerplate.svg?branch=master)](https://travis-ci.org/kasvith/express-mongo-jwt-boilerplate)

## Installation

- Install NodeJS, MongoDB
- Install `npm` or `yarn`
- Rename `.env.example` to `.env`
- Fulfill `.env` data
- Start MongoDB
- Run `yarn run dev` or `npm run dev`
- Check `http://localhost:3000/api/status` to see it works

## Changes from original project

- Fixed deprecation warnings with mongoose usage.
- Updated dependencies to fix vulnerabilities.
- Added email confirmation after registration.

## TODO

- Split users and admins to two collections:
  - Rename auth.controller.js to user.controller.js
  - create user.route.js and refactor auth.route.js to contain only this demonstration "/secret" routes
- Integrate Swagger UI documentation
- Write unit tests