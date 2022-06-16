const Commando = require("../../../node_modules/discord.js-commando");
const globals = require('../../globals')

module.exports = class TgFranckCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "tg_franck",
            group: "franck",
            alias: ["tgf"],
            memberName: "tg_franck",
            description: "Ferme la gueule à Franck"
        })
    }

    async run(message){
        if (globals.voiceConnection != null){
            if (globals.musicPlayer != null){
                destroyMusicPlayer();
            }
            disconnectVoice();
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