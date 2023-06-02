const { StatusCodes } = require('http-status-codes');
const { CityService } = require('../services');
const { SuccessResponse,ErrorResponse } = require('../utils/common');

async function createCity(req, res) {
    try {
        // console.log(req.body.name);
        const city = await CityService.createCity({
           name:req.body.name
        });
        // console.log(city);
        SuccessResponse.data = city;
        // console.log(airplane);
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        // console.log(ErrorResponse);
        return res
                .status(error.statusCode)
                .json(ErrorResponse);

        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function destroyCity(req,res) {

    try {
        const cities = await CityService.destroyCity(req.params.id);
        // console.log(req.params.id);
        SuccessResponse.data = cities;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }

}

async function updateCity(req, res) {
    try {
      const cities = await CityService.updateCity(req.params.id, req.body);
      SuccessResponse.data = cities;
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  }

module.exports={
    createCity,
    destroyCity,
    updateCity
}
