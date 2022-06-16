const paths = require('../conf/resourcesPath.json')
const fs = require('fs').promises

class Globals {
    constructor() {
        let musicPlayer = null;
        let voiceConnection = null;
        let isPlaylistPlaying = false;
        let jokeChannel = null;
    }

    destroyMusicPlayer(){
        if (musicPlayer != null){
            musicPlayer.destroy();
            musicPlayer = null;
        }
    }

    disconnectVoice(){
        if (voiceConnection != null){
            voiceConnection.disconnect();
            voiceConnection = null;
        }
    }
}

module.exports = {
    globals: new Globals(),
    log: async function log(tag, message) {
        try {
            var today = new Date()
            var logFileName = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear() + ".log"
            var content = today.getHours() + ":" + today.getMinutes() + "[" + tag + "]" + message + "\n"
            await fs.appendFile(paths.logPath + logFileName, content); 
        } catch (error) {
            console.log(error);
        }
    }
}