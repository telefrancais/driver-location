const boom = require('boom');

const { legs } = require ('../data');

exports.getLegs = async (req, res) => {
    try {
        const allLegs = await legs;
        return allLegs;
    } catch (err) {
        throw boom.boomify(err);
    }
} 

exports.getSingleLeg = async (req, res) => {
    try {
        const leg = legs.filter((val) => {
            return val.legID === req.params.id;
        });
        return leg;
    } catch (err) {
        throw boom.boomify(err);
    }
  }