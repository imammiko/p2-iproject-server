const axios = require("axios");
const { dataSensorDevice, sequelize } = require("../models/index");
async function sentData(baseUrlDhtdata, dataSensor) {
	try {
		let data = await axios({
			method: "post",
			url: `${baseUrlDhtdata}`,
			headers: {
				"X-M2M-Origin": "8d9c8e44d919da12:6e682d8f6290bf04",
				"Content-Type": "application/json;ty=4",
				Accept: "application/json",
			},
			data: dataSensor,
		});
		return data;
	} catch (error) {
		return error;
	}
}

async function getDataLastTime(baseUrlDhtdata) {
	try {
		let data = await axios({
			method: "get",
			url: `${baseUrlDhtdata}/la`,
			headers: {
				"X-M2M-Origin": "8d9c8e44d919da12:6e682d8f6290bf04",
				"Content-Type": "application/json;ty=4",
				Accept: "application/json",
			},
		});
		return data;
	} catch (error) {
		return error;
	}
}

async function getDataDeviceTime(range, sensor) {
	range = range.toLowerCase();
	return dataSensorDevice.findAll({
		where: {
			// timeStamp: {
			// 	$lte: new Date("2021-09-21 21:00:00"),
			// 	$gte: new Date("2021-09-21 12:00:00"),
			// },
		},
		attributes: [
			[
				sequelize.fn("date_trunc", `${range}`, sequelize.col("timeStamp")),
				`${range}`,
			],
			[sequelize.fn("AVG", sequelize.col(`${sensor}`)), "AVG"],
		],
		group: `${range}`,
	});
}
module.exports = {
	sentData,
	getDataLastTime,
	getDataDeviceTime,
};
