const Commando = require("../../../node_modules/discord.js-commando");
const ytdl = require('../../../node_modules/ytdl-core');
const paths = require('../../../conf/resourcesPath.json')
const globals = require('../../globals');
const playlist = require(paths.jsonPath + 'playlist.json');

module.exports = class TgCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "next",
            group: "franck",
            memberName: "next",
            description: "next music"
        })
    }

    async run(message){
        if (globals.isPlaylistPlaying){
            globals.musicPlayer = globals.voiceConnection.play(ytdl(playlist.troll.at(Math.random() * playlist.troll.length), { quality: "highestaudio" }));
        }
    }
}