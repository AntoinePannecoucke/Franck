const Commando = require("../../../node_modules/discord.js-commando");
const BlaguesAPI = require('../../../node_modules/blagues-api');
const config = require('../../../conf/config.json');
const globals = require("../../globals");

module.exports = class JokeCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "joke",
            group: "franck",
            memberName: "joke",
            description: "Dis une blague bien beauf comme Franck finalement"
        })
    }

    async run(message){
        const blagues = new BlaguesAPI(config.joke_api_token);
        const joke = await blagues.random({
            disallow: [blagues.categories.GLOBAL, blagues.categories.DEV]
        });
        message.channel.send(joke.joke);
        await globals.sleep(2500);
        message.channel.send(joke.answer);
    }
    
}