let fs = require("fs");
// require('../data/dataSensor.json');
let data = JSON.parse(fs.readFileSync("../data/dataSensor.json", "utf8"));

let dataObjek = [];

for (const i of data) {
	let objek = {};
	if (i.data.includes("NaN")) {
		continue;
	}
	let dataSensor = JSON.parse(i.data);
	objek.temperature = dataSensor.temperature;
	objek.humidity = dataSensor.humidity;
	objek.timeStamp = i.time;
	dataObjek.push(objek);
	// console.log(dataSensor, objek);
	// objek
	//dataObjek.push()
}
console.log(dataObjek, "");

// data = data.map((el) => {
//     el.data = JSON.parse(el.data);
//     if (data.includes("NaN")) {
//         continue
//     } return el;
// });
