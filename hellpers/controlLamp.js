const { dataLampDevice } = require("../models/index");
const { sentData, getDataLastTime } = require("./apiPoint");
const { parsingDate } = require("./timeParse");

let baseUrlDhtdata =
	"https://platform.antares.id:8443/~/antares-cse/antares-id/app23/lamp";

function sentStatusLampu(param) {
	let objek = { "m2m:cin": { con: `{"lamp":${param}}` } };
	return sentData(baseUrlDhtdata, objek);
}

function getStatusLamp() {
	return new Promise(function (resolve, reject) {
		getDataLastTime(baseUrlDhtdata)
			.then((data) => {
				// console.log(parsingDate(data.data["m2m:cin"].lt));
				let datalampu = JSON.parse(data.data["m2m:cin"].con);
				let timeStamp = new Date(parsingDate(data.data["m2m:cin"].lt));
				let objek = { ...datalampu, timeStamp: timeStamp };
				resolve(objek);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
function getStatusLampToDB() {
	let dataSensor = {};
	return new Promise(function (resolve, reject) {
		getStatusLamp()
			.then((data) => {
				dataSensor = data;
				return dataLampDevice.findOne({
					where: {
						timeStamp: data.timeStamp,
					},
				});
			})
			.then((data) => {
				if (!data) {
					dataSensor.createdAt = new Date();
					dataSensor.updatedAt = new Date();
					console.log(dataSensor);
					console.log(data, dataSensor.timeStamp);
					return dataLampDevice.create(dataSensor);
				} else {
					return data;
				}
			})
			.then((data) => {
				resolve(data);
				console.log(data, "tersimpan di database");
			})
			.catch((err) => {
				reject(err);
				console.log(err);
			});
	});
}

module.exports = {
	sentStatusLampu,
	getStatusLamp,
	getStatusLampToDB,
};
