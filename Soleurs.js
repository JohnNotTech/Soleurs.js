// Include Discord.js and OnTime
var Discord = require("discord.js");
var client = new Discord.Client();
var ontime = require("ontime");

// Discord login token (value omitted)
var token;

// Define variable for main channel, the channel used for morning greeting
var mainChannel;
var getsSpite = "";

// Define quotes for the list
var quotes = [
			"Productivity is throwing pens at your coworker's ass and seeing if they bounce into the adjacent trash can.",
			"So the last three times I've seen Jill, she's entered the room by saying \"Hi, my name is Joseph Smith, and I'm going to FUCK THIS BABY!\"",
			"You guys are no fun",
			"Hey some of us have jobs",
			"Oh don't be that extreme",
			"Can I help you?",
			"I keel you"
		];

// Set up Soleurs.js
client.on("message", message => {
    if (message.content.startsWith("sb setup")) {
        // Set mainChannel to the channel in which "sb setup" is run
        mainChannel = message.channel;
        // Reply "Yeesh" in mainChannel to confirm
        mainChannel.send("Yeesh");
    }
});

// Reply "Oi" for command "sb ping"
client.on("message", message => {
    // 
    if (message.content.startsWith("sb ping")) {
        message.channel.send("Oi");
    }
});

client.on("message", message => {
    // 
    if (message.content.startsWith("sb help")) {
        message.channel.send("This bot has **limited functionality**, " + message.author + ". You can say **sb quote** for a random Soleurs quote, **sb morning** for a morning greeting, or **sb ping** to make sure the bot is working.");
    }
});

client.on("message", message => {
    // 
    if (message.content.startsWith("sb morning")) {
        goodMorning(message.channel,false);
    }
});

// When mentioned (@Soleurs.js#5702) or if command "sb quote" is issued, give a random quote 
client.on("message", message => {
    // 
    if (message.content.includes("@Soleurs.js") || message.content.startsWith("sb quote")) {
		// Get a random quote from the quotes list
		var randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
		
        message.channel.send(randomQuote);
    }
});

client.on("message", message => {
    // 
    if (message.content.includes("Good morning") && message.content.includes("ow's @everyone doin")) {
        var rebuttals = ["I have a job, you know :joy:","Hey some of us have jobs","I have a job dude"];
        var randomRebuttal = rebuttals[Math.floor(Math.random()*rebuttals.length)];
        message.channel.send(randomRebuttal);
        getsSpite = message.author;
    }
});

// Print alert to console when signed in
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Call OnTime to schedule a job
ontime({
    // at 12 PM UTC (8 AM EST) every day
    utc: true,
    cycle: "13:15:00"
}, function (ot) {
    goodMorning(mainChannel,true)
    ot.done();
    return;
});

function goodMorning(channel,at) {
    channel.send("Good morning");
    var question = "How's ";
    if (at == true) {
        question = question + "@everyone "
        
    }
    else {
        question = question + "everyone "
        
    }
    if (getsSpite != "") {
        question = question + "except " + getsSpite + " ";
        getsSpite = "";
    }
    question = question + "doin";
    channel.send(question);
}


// Login to Discord
client.login(token);