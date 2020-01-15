const Dev = require('../models/Dev');
const parseStringAsString = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        // buscar todos os devs num raio de 10km 
        // filtrar por tech
        console.log(request.query);

        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsString(techs);

        console.log(techsArray)

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs })
    } 
}