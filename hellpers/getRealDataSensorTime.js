const { sentData, getDataLastTime } = require("./apiPoint");
const { dataSensorDevice, sequelize } = require("../models/index");
const { parsingDate } = require("./timeParse");
const { io } = require("../app");
let count = 0;
let lastTimeGetDataOnAntares = "";
let baseUrlDhtdata =
	"https://platform.antares.id:8443/~/antares-cse/antares-id/app23/dhtdata";

let lastDate = setInterval(() => {
	let objek = {};
	let flagStatusCreate = false;
	getDataLastTime(baseUrlDhtdata)
		.then((data) => {
			return data.data;
		})
		.then((data) => {
			count++;

			if (!data["m2m:cin"].con.includes("NaN")) {
				let dataSensor = JSON.parse(data["m2m:cin"].con);

				objek.temperature = dataSensor.temperature;
				objek.humidity = dataSensor.humidity;
				objek.timeStamp = new Date(parsingDate(data["m2m:cin"].lt));
				objek.createdAt = new Date();
				objek.updatedAt = new Date();
				if (String(lastTimeGetDataOnAntares) != String(objek.timeStamp)) {
					flagStatusCreate = true;
				}
				lastTimeGetDataOnAntares = objek.timeStamp;
			}
			if (flagStatusCreate) {
				return dataSensorDevice.create(objek);
			}
			return undefined;
		})
		.then((data) => {})
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
}, 5000);

module.exports = {
	lastDate,
};
