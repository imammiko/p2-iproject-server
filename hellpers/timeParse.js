function parsingDate(param) {
	let dateFromParse = param;
	let dataAfterParse = "";
	for (let i = 0; i < dateFromParse.length; i++) {
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

module.exports = {
	parsingDate,
};
