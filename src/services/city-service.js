const { CityRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();
// console.log(cityRepository);

async function createCity(data) {
    try {
        // console.log(data);
        const city = await cityRepository.create(data);
        // console.log(city);
        return city;
    } catch(error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            // console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            // throw new AppError('Cannot create a new Airplance object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);

        // console.log(error);

        // if(error.name == 'TypeError'){
        //     throw new AppError('Cannot create a new Airplance object', StatusCodes.INTERNAL_SERVER_ERROR);
        // }

        // throw error;
    }
}

module.exports={
    createCity
}