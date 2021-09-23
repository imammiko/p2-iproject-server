const express = require("express");
const app = express();
const dotenv = require("dotenv");

const port = process.env.PORT || 3000;
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
const axios = require("axios");
lastDate;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/dataSensorTemperature", async (req, res) => {
	try {
		let { rangeData } = req.query;
		let dataRange = await getDataDeviceTime(rangeData, "temperature");
		res.status(200).json(dataRange);
	} catch (error) {
		res.status(500).json({
			message: "internal server error",
		});
	}
});

app.get("/dataSensorHumidity", async (req, res) => {
	try {
		let { rangeData } = req.query;
		let dataRange = await getDataDeviceTime(rangeData, "humidity");
		res.status(200).json(dataRange);
	} catch (error) {
		res.status(500).json({
			message: "internal server error",
		});
	}
});

app.get("/lastDataSensor", async (req, res) => {
	try {
		let dataLast = await dataSensorDevice.findOne({
			order: [["id", "DESC"]],
		});
		res.status(200).json(dataLast);
	} catch (error) {
		console.lres.status(500).json({
			message: "internal server error",
		});
		og(data);
	}
});

app.get("/weather", async (req, res) => {
	try {
		var options = {
			method: "GET",
			url: "https://community-open-weather-map.p.rapidapi.com/weather",
			params: { q: "jakarta,id" },
			headers: {
				"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
				"x-rapidapi-key": "f6720d0b7bmsh34a868cd0f530c8p12b639jsn13830c43d215",
			},
		};

		axios
			.request(options)
			.then(function (response) {
				res.status(200).json(response.data);
				console.log(response.data);
			})
			.catch(function (error) {
				res.status(400).json({
					message: "bad Request",
				});
				console.error(error);
			});
	} catch (error) {}
});

app.get("/controlLampu", async (req, res) => {
	getStatusLampToDB()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(500).json({
				message: "internal server error",
			});
		});
});

app.post("/controlLampu", async (req, res) => {
	try {
		let { lamp } = req.body;
		sentStatusLampu(lamp)
			.then((data) => {
				return dataLampDevice.create({
					lamp,
					timeStamp: new Date(),
				});
			})
			.then((data) => {
				res.status(200).json(data);
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "internal server error",
		});
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

server.listen(port, () => {
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
