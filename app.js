const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { dataLampDevice, dataSensorDevice } = require("./models/index");
const {
	sentStatusLampu, // param 1/0
	getStatusLamp,
	getStatusLampToDB,
} = require("./hellpers/controlLamp");
const { lastDate } = require("./hellpers/getRealDataSensorTime");
const {
	sentData,
	getDataLastTime,
	getDataDeviceTime,
} = require("./hellpers/apiPoint");
lastDate;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/dataSensorTemperature", async (req, res) => {
	try {
		let { rangeData } = req.query;
		let dataRange = await getDataDeviceTime(rangeData, "temperature");
		res.status(200).json(dataRange);
	} catch (error) {}
});

app.get("/dataSensorHumidity", async (req, res) => {
	try {
		let { rangeData } = req.query;
		let dataRange = await getDataDeviceTime(rangeData, "humidity");
		res.status(200).json(dataRange);
	} catch (error) {}
});

app.get("/lastDataSensor", async (req, res) => {
	try {
		let dataLast = await dataSensorDevice.findOne({
			order: [["id", "DESC"]],
		});
		res.status(200).json(dataLast);
	} catch (error) {
		console.log(data);
	}
});

app.post("/lastDataSensor", async (req, res) => {
	try {
		let { lamp } = req.body;
		let dataLampToDataBase = await dataLampDevice.create({
			lamp,
			timeStamp: new Date(),
		});
		sentStatusLampu(lamp);
		// console.log(dataLampToDataBase, "<<lamp data");
		res.status(200).json(dataLampToDataBase);
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

/*
NOTE 
API 
last data,
data interval 1 hr , 1 day , 1week,
create data for news control lamp;
get data lamp from database;

*/
