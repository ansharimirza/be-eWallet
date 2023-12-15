const express = require('express');
const usersRouter = require('./users');

module.exports = dependencies => {
    const routes = express.Router();
    const users = usersRouter(dependencies);

    routes.use('/user', users);
    
    return routes;
}