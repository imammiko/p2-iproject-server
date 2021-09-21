const { dataLampDevice } = require("../models/index");
const { sentData, getDataLastTime } = require("./apiPoint");
let baseUrlDhtdata =
	"https://platform.antares.id:8443/~/antares-cse/antares-id/app23/dht";

function sentStatusLampu(param) {
	let objek = { "m2m:cin": { con: `{"lamp":${param}}` } };
	sentData(baseUrlDhtdata, objek)
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
}

module.exports = {
	sentStatusLampu,
};
