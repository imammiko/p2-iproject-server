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
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
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

app.post("/controlLampu", async (req, res) => {
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

let lastDataTimeStamp = "";
let lastDataTimeStampLamp = "";
io.on("connection", (socket) => {
	setInterval(() => {
		dataSensorDevice
			.findOne({
				order: [["id", "DESC"]],
			})
			.then((data) => {
				if (String(lastDataTimeStamp) != String(data.timeStamp)) {
					console.log("masuk");
					socket.broadcast.emit("newdata", data);
				}
				lastDataTimeStamp = data.timeStamp;
			});
		getStatusLamp().then((data) => {
			if (String(lastDataTimeStampLamp) != String(data.timeStamp)) {
				socket.broadcast.emit("newdataLamp", data);
				// console.log(data);newdataLamp;
			}
			lastDataTimeStampLamp = data.timeStamp;
		});
	}, 1000);
});

server.listen(3000, () => {
	console.log("listening on *:3000");
});

/*
NOTE 
API 
last data,
data interval 1 hr , 1 day , 1week,
create data for news control lamp;
get data lamp from database;

*/
module.exports = {
	io,
};
