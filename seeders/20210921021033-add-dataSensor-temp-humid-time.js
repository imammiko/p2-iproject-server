"use strict";
let fs = require("fs");
const { DATE } = require("sequelize");
module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */

		// require('../data/dataSensor.json');
		// require('../data/dataSensor.json');
		let data = JSON.parse(fs.readFileSync("./data/dataSensor.json", "utf8"));
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
			objek.createdAt = new Date();
			objek.updatedAt = new Date();
			dataObjek.push(objek);
		}
		console.log(dataObjek);
		await queryInterface.bulkInsert("dataSensorDevices", dataObjek, {});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("dataSensorDevices", null, {});
	},
};
