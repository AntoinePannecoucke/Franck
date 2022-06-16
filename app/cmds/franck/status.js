const Commando = require("discord.js-commando");
const manifest = require('../../../manifest.json');

module.exports = class StatusCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "status",
            group: "franck",
            memberName: "status",
            description: "Affiche le status de Franck"
        })
    }

    async run(message){
        var status = manifest.AppName + " v" + manifest.MajorVersionNumber + "." 
            + manifest.MinorVersionNumber + "." + manifest.RevisionVersionNumber 
            + " " + manifest.VersionName + "\nDeveloped by : ";
        
        manifest.AuthorsNames.forEach((author) => {
            status += "\n\t" + author
        })

        message.channel.send(status);
    }
    
}
