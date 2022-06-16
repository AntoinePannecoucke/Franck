const Commando = require("discord.js-commando");
const config = require('../../../conf/config.json');
const globals = require('../../globals');

module.exports = class AnswerCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "answer",
            aliases: ["rep", "reponse"],
            group: "franck",
            memberName: "answer",
            description: "Sondage"
        })
    }

    /**
     * @param {Message} message 
     * @param {String} answer
     * @returns 
     */
    async run(message, arg){
        if (globals.Survey.isSurveyRunning){
            globals.Survey.answers.forEach(Answer => {
                if (Answer.author == message.author.id){
                    Answer.answer = arg;
                    globals.log("Info", "Réponse de " + message.author.username + " modifiée");
                    return;
                }
            })
            globals.Survey.answers.push({answer: arg, author: message.author.id});
            globals.Survey.answersCount += 1;
            globals.log("Info", "Réponse de " + message.author.username + " ajoutée");
            globals.log("Info", "Il y a " + globals.Survey.answersCount + " réponses");
        }
        else {
            message.channel.send("Aucun sondage en cours");
        }
        
    }
    
}