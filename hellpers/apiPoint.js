const axios = require("axios");
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

module.exports = {
	sentData,
	getDataLastTime,
};
