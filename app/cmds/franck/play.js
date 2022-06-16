const Commando = require("../../../node_modules/discord.js-commando");
const ytdl = require('../../../node_modules/ytdl-core');
const paths = require('../../../conf/resourcesPath.json')
const playlist = require(paths.jsonPath + 'playlist.json');
const globals = require("../../globals");

module.exports = class PlayCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "play",
            group: "franck",
            memberName: "play",
            description: "Joue un audio",
            args: []
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String} arg 
     * @returns 
     */
    async run(message, arg){
        const { voice } = message.member;

        if (!voice.channelID){
            message.reply("Je te trouve pas...");
            return;
        }

        if (arg.toLowerCase() == "dev"){
            voice.channel.join().then(connection => {
                globals.voiceConnection = connection;
                globals.musicPlayer = globals.voiceConnection.play(ytdl(playlist.dev, { quality: "highestaudio" }));
                globals.musicPlayer.on("finish", () => {
                    globals.musicPlayer = globals.voiceConnection.play(ytdl(playlist.dev, { quality: "highestaudio" }));
                })
    
                globals.musicPlayer.on("error", err => {
                    console.log(err);
                    destroyMusicPlayer();
                    disconnectVoice();
                })
    
                globals.voiceConnection.on("disconnect", () => {
                    destroyMusicPlayer();
                })
    
    
            }).catch(err => {
                console.log(err);
            });
        }
        else {
            voice.channel.join().then(connection => {
                globals.voiceConnection = connection;
                globals.musicPlayer = globals.voiceConnection.play(ytdl(playlist.troll.at(Math.random() * playlist.troll.length)/*, { quality: "highestaudio" }*/));
                globals.isPlaylistPlaying = true;
                
                globals.musicPlayer.on("finish", () => {
                    globals.musicPlayer = globals.voiceConnection.play(ytdl(playlist.troll.at(Math.random() * playlist.troll.length)/*, { quality: "highestaudio" }*/));
                })
    
                globals.musicPlayer.on("error", err => {
                    console.log(err);
                    globals.isPlaylistPlaying = false;
                    destroyMusicPlayer();
                    disconnectVoice();
                })
    
                globals.voiceConnection.on("disconnect", () => {
                    globals.isPlaylistPlaying = false;
                    destroyMusicPlayer();
                    
                })
    
    
            }).catch(err => {
                console.log(err);
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