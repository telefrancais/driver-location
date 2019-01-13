const boom = require('boom');

const { stops } = require ('../data');

exports.getStops = async (req, res) => {
    try {
        const allStops = await stops;
        return allStops;
    } catch (err) {
        throw boom.boomify(err);
    }
} 