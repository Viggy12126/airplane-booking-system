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

async function destroyCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id, data) {
    try {
      const response = await cityRepository.update(id, data);
      return response;
    } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError(
          // error.message, //Overriding the error message thrown from the destroy(id) function inside the crud-repository file
          "For the request you made, there is no city / column available to update!",
          error.statusCode
        );
      } else if (
        error.name == "SequelizeValidationError" ||
        error.name == "SequelizeUniqueConstraintError"
      ) {
        // If u get a SequelizeValidationError, it is something that is not coming correctly from the client side.  We have to send a meaningful response to the user/client that this validation is not going correctly, so please correct this field. So status code will also be some client related status code.
        // If u get a SequelizeUniqueConstraintError, it is something that is not coming correctly from the client side. The name value should be unique in the table as we have put a `unique: true` constraint in the table column. We are trying to enter a name that already exists in the table. So status code will also be some client related status code.
        let explanation = [];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST); // Send client-related status code for SequelizeValidationError
      }
      throw new AppError(
        `The City's data cannot be updated!`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

module.exports={
    createCity,
    destroyCity,
    updateCity
}