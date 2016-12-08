# masterkode - Q&A Site

https://travis-ci.org/bahrulhikmi/masterkode

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.7.6.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [Yeoman](http://yeoman.io/) - Already integrated with latest npm, for installing `npm install --global yo`
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.


## Project Structure

Overview
```	
(root)                      - Dependency, Gulp build, and Test configuration files located here
├── client
│   ├── app                 - All of our app specific components go in here
│   ├── assets              - Custom assets: fonts, images, etc…
│   ├── components          - Our reusable components, non-specific to our app (e.g directives, filters, header)
│
├── e2e                     - Our protractor end to end tests
│
└── server
    ├── api                 - Our apps server api
    ├── auth                - For handling authentication with different auth strategies
    ├── components          - Our reusable or app-wide components
    ├── config              - Where we do the bulk of our apps configuration
    |   └── seed.js         - Populate mockup data to DB here 
    │   └── environment     - Configuration specific to the node environment
    └── views               - Server rendered views
```

server/api
```
question
├── index.js                - Routes
├── question.controller.js  - Controller for our `question` endpoint
├── question.model.js       - Database model
├── question.socket.js      - Register socket events
└── question.spec.js        - Test specification
```
client/app
```
main
├── main.js                 - Routes
├── main.controller.js      - Controller for our main route
├── main.controller.spec.js - Test specification
├── main.html               - View
└── main.scss               - Styles
```

## Troubleshooting

