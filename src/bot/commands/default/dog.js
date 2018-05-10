const path = require("path");
const superagent = require("superagent");

module.exports = {
	async run() {
		const { body: [file] } = await superagent.get("http://shibe.online/api/shibes?count=1");
		const { body: buffer } = await superagent.get(file);

		return {
			file: buffer,
			name: path.basename(file)
		};
	}
};
