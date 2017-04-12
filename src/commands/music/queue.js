module.exports = {
	process: async message => {
		let player = bot.players.get(message.channel.guild.id);
		if(!player) return "There is currently no music playing";

		let queueMsg = `__**Music Queue (${player.queue.length})**__`;
		let page = message.args[0] || 1;
		let pageAmount = Math.ceil(player.queue.length / 15);
		if(page > pageAmount) page = pageAmount;

		if(player.queue.length > 0) {
			queueMsg += player.queue.slice((page - 1) * 15, ((page - 1) * 15) + 14)
				.map((song, i) => `[${i}] ${song.title.length}` > 75 ? `${song.title.substring(0, 72)}...` : song.title)
				.join("\n");

			queueMsg += `\nPage ${page} of ${pageAmount}`;
		} else {
			queueMsg += `\nN/A`;
		}

		if(!player.current || !player.connection) {
			queueMsg += `\n\nPlaying: Nothing (Still queueing?)`;
		} else {
			if(!isNaN(player.current.duration)) var videoDuration = bot.utils.secondsToDuration(player.current.duration);
			queueMsg += `\n\nPlaying: ${player.current.title}`;

			let playTime = bot.utils.secondsToDuration(Math.floor(player.connection.current.playTime / 1000));
			if(videoDuration) queueMsg += ` **(**${playTime}/${videoDuration}**)**`;
			else queueMsg += ` **(**${playTime}/LIVE**)**`;
		}

		queueMsg += `\nRepeat: **${player.repeat ? "on" : "off"}**`;
		return queueMsg;
	},
	guildOnly: true,
	description: "List the music queue",
	args: [{
		type: "int",
		label: "page",
		optional: true,
		min: 1
	}]
};