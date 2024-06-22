const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

// const port=3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);
app.use('/flightsService/api',apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);

    //Bad code alert
    // const {City,Airport}=require('./models');

    // const blore=await City.findByPk(10);
    // // console.log(blore);

    // const kmpgowda= await blore.createAirport({name:'KempeGowda Airport',code:'BLR'});
    // console.log(kmpgowda);

    // const airportsinblr=await blore.getAirports();
    // console.log(airportsinblr);

    // const bengluru_airport=await Airport.findByPk(1);
    // console.log(bengluru_airport);

    // await City.destroy({
    //     where:{
    //         id:10
    //     }
    // })
});
