const useCases = require('../useCases');
const repositories = require('../frameworks/repositories/knex');
const requests = require('../frameworks/requests');

module.exports = {
    useCases,
    ...repositories,
    requests,
}