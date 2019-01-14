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

exports.getSingleStop = async (req, res) => {
    try {
        const allStops = await stops;
        const stop = allStops.filter((val) => {
            return val.x == req.params.row && val.y == req.params.column;
        });
        return stop;
    } catch (err) {
        throw boom.boomify(err);
    }
}