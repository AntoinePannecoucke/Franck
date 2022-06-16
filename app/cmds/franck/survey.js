const Commando = require("discord.js-commando");
const config = require('../../../conf/config.json');
const globals = require('../../globals');

module.exports = class SurveyCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "survey",
            aliases: ["sondage", "question", "q"],
            group: "franck",
            memberName: "survey",
            description: "Sondage"
        })
    }

    /**
     * @param {Message} message 
     * @param {String} question
     * @returns 
     */
    async run(message, question){
        if (globals.Survey.isSurveyRunning){
            globals.log("Info", "Sondage déjà en cours");
            message.channel.send("Un sondage est déjà en cours \n Veuillez attendre que celui-ci soit terminé");
            return;
        }
        else {
            /**
             * Start the survey
             */
            globals.log("Info", "Sondage lancé");
            let general = message.client.channels.cache.get(config.general_text_channel)
            general.send("Sondage lancé :\n" + question + "\n"
                + "Répondez avec : !f rep [votre réponse]\n" + "Ce sondage expire dans " + config.survey_duration + " minutes");
            globals.Survey.isSurveyRunning = true;

            /**
             * Wait for the survey to end
             */
            globals.log("Info", "Sondage en attente");
            await globals.sleep(config.survey_duration * 60 * 1000);
            /**
             * Statistics
             */
            globals.log("Info", "Sondage terminé");
            let stats = "Sondage terminé\n";
            let answers = [];

            for (var i = 0; i < globals.Survey.answers.length; i++){
                if (answers.indexOf(globals.Survey.answers[i].answer.toLowerCase()) == -1){
                    answers.push({
                        answer: globals.Survey.answers[i].answer.toLowerCase(),
                        count: globals.Survey.answers.filter(answer => answer.answer.toLowerCase() == globals.Survey.answers[i].answer.toLowerCase()).length
                    });
                }
            }

            

            answers.sort((a,b) => b.count - a.count);
            answers.forEach((answer) => {
                stats += answer.answer + " : " + (answer.count / globals.Survey.answersCount * 100) + "%\n";
            })

            general.send(stats);

            /**
             * Reset the survey
             */
            globals.log("Info", "Sondage réinitialisé");
            globals.Survey = {
                isSurveyRunning: false,
                creator: null,
                answers: [],
                answersCount: 0
            }

        }
        
    }
    
}