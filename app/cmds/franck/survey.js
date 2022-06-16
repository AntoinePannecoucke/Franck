const Commando = require("discord.js-commando");
const config = require('../../../conf/config.json');
const globals = require('../../globals');

module.exports = class JokeCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "survey",
            group: "franck",
            memberName: "survey",
            description: "Sondage"
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args
     * @returns 
     */
    async run(message, args){

        args.forEach((arg) => {
            globals.log("DEBUG", arg)
        })
    }
    
}