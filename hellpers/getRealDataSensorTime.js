const { sentData, getDataLastTime } = require("./apiPoint");
const { dataSensorDevice } = require("../models/index");
let count = 0;
let lastTimeGetDataOnAntares = "";
let baseUrlDhtdata =
	"https://platform.antares.id:8443/~/antares-cse/antares-id/app23/dhtdata";

function parsingDate(param) {
	let dateFromParse = param;
	let dataAfterParse = "";
	for (let i = 0; i < dateFromParse.length; i++) {
		//console.log(dateFromParse[i], i);
		dataAfterParse += dateFromParse[i];
		if (i == 3 || i == 5) {
			dataAfterParse += "-";
		}
		if (i == 10 || i == 12) {
			dataAfterParse += ":";
		}
	}
	return dataAfterParse;
}

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
				// console.log(dataSensor);

				objek.temperature = dataSensor.temperature;
				objek.humidity = dataSensor.humidity;
				objek.timeStamp = new Date(parsingDate(data["m2m:cin"].lt));
				objek.createdAt = new Date();
				objek.updatedAt = new Date();
				if (String(lastTimeGetDataOnAntares) != String(objek.timeStamp)) {
					//console.log("data parse");
					//console.log(objek, lastTimeGetDataOnAntares);
					flagStatusCreate = true;
					// console.log(lastTimeGetDataOnAntares, objek.timeStamp);
				}
				lastTimeGetDataOnAntares = objek.timeStamp;
			}
			if (flagStatusCreate) {
				//console.log(lastTimeGetDataOnAntares, objek.timeStamp);
				return dataSensorDevice.create(objek);
			}
			return undefined;
		})
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
