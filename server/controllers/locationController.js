const boom = require('boom');

let driverLocation = {
    "activeLegID": "FG",
    "legProgress": 33
};

exports.getLocation = async (req, res) => {
    try {
        const location = await driverLocation;
        return location;
    } catch (err) {
        throw boom.boomify(err);
    }
} 

exports.updateLocation = async (req, res) => {
    try {
        const id = req.body.legID;
        const progress = req.body.progress;
        Object.assign(driverLocation, {activeLegID: id, legProgress: progress});
        return driverLocation;
    } catch (err) {
        throw boom.boomify(err);
    }
}