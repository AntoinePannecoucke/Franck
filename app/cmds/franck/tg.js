const Commando = require("../../../node_modules/discord.js-commando")
const paths = require('../../../conf/resourcesPath.json')
const ytdl = require('../../../node_modules/ytdl-core')
const tg = require(paths.jsonPath + 'tg.json')
const globals = require('../../globals')


module.exports = class TgCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "tg",
            group: "franck",
            memberName: "tg",
            description: "send tg gif"
        })
    }

    async run(message){
        message.channel.send(tg.gifs.at(Math.random() * tg.gifs.length));
        const { voice } = message.member;
        if (voice.channelID){
            voice.channel.join().then(connection => {
                globals.voiceConnection = connection;
                globals.musicPlayer = globals.voiceConnection.play(ytdl(tg.sound, { quality: "highestaudio" }));
                globals.musicPlayer.on("finish", () => {
                    destroyMusicPlayer();
                    disconnectVoice();
                })
    
                globals.musicPlayer.on("error", err => {
                    console.log(err);
                    destroyMusicPlayer();
                    disconnectVoice();
                })

                globals.voiceConnection.on("disconnect", () => {
                    destroyMusicPlayer();
                })
            });
        }
    }
}

function destroyMusicPlayer(){
    if (globals.musicPlayer != null){
        globals.musicPlayer.destroy();
        globals.musicPlayer = null;
    }
}

function disconnectVoice(){
    if (globals.voiceConnection != null){
        globals.voiceConnection.disconnect();
        globals.voiceConnection = null;
    }
}