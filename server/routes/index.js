const locationController = require('../controllers/locationController');
const stopController = require('../controllers/stopController');
const legController = require('../controllers/legController');

const routes = [
    {
        method: 'GET',
        url: '/location',
        handler: locationController.getLocation
    },
    {
        method: 'PUT',
        url: '/location',
        handler: locationController.updateLocation
    },
    {
        method: 'GET',
        url: '/stops',
        handler: stopController.getStops
    },
    {
        method: 'GET',
        url: '/stops/:row/:column',
        handler: stopController.getSingleStop
    },
    {
        method: 'GET',
        url: '/legs',
        handler: legController.getLegs
    },
    {
        method: 'GET',
        url: '/legs/:id',
        handler: legController.getSingleLeg
    }
];

module.exports = routes;