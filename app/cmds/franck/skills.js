const Commando = require("../../../node_modules/discord.js-commando");
const fileStream = require("../../../node_modules/fs-minipass");
const paths = require('../../../conf/resourcesPath.json')


module.exports = class SkillsCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "skills",
            group: "franck",
            memberName: "skills",
            description: "Donne la liste des compétences de Franck"
        })
    }

    async run(message){
        fileStream.readFile(paths.textPath + 'skills.txt', (err, data) => {
            if (err) {
                throw err;
            }
            message.reply(`\n${data.toString()}`);
        });
    }
}