const config = require('../conf/config.json');
const path = require("path");
const globals = require("./globals");
const Commando = require("discord.js-commando");
const ytdl = require('ytdl-core');
const express = require('express');
const { InteractionType, InteractionResponseFlags, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');

const app = express();


const client = new Commando.CommandoClient({
    owner: config.owner,
    commandPrefix: config.prefix
})


const lastnameTable = {
    Dana3l: "Pannecoucke",
    AlarmeSquash: "Chevauchet",
    roro: "Haby",
    Moulman: "Escolano",
    RyyyanZ: "Mo"
}

//#endregion

client.login(config.discord_token);

client.on("ready", () => {
    globals.log("Connect", "Franck est Connecté");
    client.registry
        .registerGroups([
            ["franck", "franck commands"]
        ])
        .registerDefaults()
        .registerCommandsIn(path.join(__dirname, "cmds"))
    let channel = client.channels.cache.get(config.general_text_channel);
    if (channel.type == "text" && !config.debug){
        channel.send("@everyone Y A QUELQU'UUUUUUUUUUN ?!! ALLOOOOOOOOOOOO !! EST CE QUE VOUS M'ENTENDEZ ?!! AAAALLOOOOOOOOOOOOOO !!!");
    }

    app.post('/interactions', verifyKeyMiddleware(config.discord_token), (req, res) => {
        const interaction = req.body;
        if (interaction.type === InteractionType.MESSAGE_COMPONENT) {
            res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: 'Hello, you interacted with a component.',
                    flags: InteractionResponseFlags.EPHEMERAL,
                },
            });
        }
    });

    app.listen(8999, () => {

    })

    globals.jokeChannel = client.channels.cache.get(config.joke_channel);
    channel = client.channels.cache.get(config.general_voice_channel);
    if (channel.type == "voice"){
        channel.join().then(connection => {
            globals.voiceConnection = connection;
            globals.musicPlayer = globals.voiceConnection.play(config.intro);
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
});

client.on("messageDelete", message => {
    if (!message.author.bot){
        globals.log("Action", message.author.username + " a supprimé un message et Franck à réagi")
        message.channel.send(`Qu'avez vous à cacher Monsieur ${lastnameTable[message.author.username]} ?! Vous n'êtes pas un collabo j'espère !`);
    }
    else if (message.author.client === client){
        globals.log("Action", message.author.username + " a supprimé un message et Franck à réagi")
        message.channel.send("Vas y, dit moi de la fermer pendant que tu y es !");
    }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
    if (!oldMessage.author.bot){
        globals.log("Action", message.author.username + " a modifié un message et Franck à réagi")
        oldMessage.reply(`Bah alors on sais pas écrire ! Faut retourner au CP !`);
    }
});


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