const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const rootResolver = require('./resolver/index')

module.exports = { typeDefs, resolvers, rootResolver };