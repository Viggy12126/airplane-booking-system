const { StatusCodes } = require('http-status-codes');

const { AirplaneService } = require('../services');
const { SuccessResponse,ErrorResponse } = require('../utils/common');

async function createAirplane(req, res) {
    try {
        // console.log(req.body.modelNumber, req.body.capacity);
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
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

async function getAirplanes(req,res){
try {
    
    const airplanes = await AirplaneService.getAirplanes();
    SuccessResponse.data = airplanes;
    return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
} catch (error) {
    ErrorResponse.error = error;
    return res
            .status(error.statusCode)
            .json(ErrorResponse);
}
}

async function getAirplane(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplane(req.params.id);
        // console.log(req.params.id);
        SuccessResponse.data = airplanes;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports={
    createAirplane,
    getAirplanes,
    getAirplane
}
