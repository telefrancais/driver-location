// Require fastify.
const fastify = require('fastify')({
    logger: true
});

const routes = require('./routes');

routes.forEach((route, index) => {
    fastify.route(route);
});
  
// Run the server.
const start = async () => {
    try {
        await fastify.listen(3001);
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();