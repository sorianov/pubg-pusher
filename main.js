const {Fetcher} = require('./src/fetcher');
const {Formatter} = require('./src/formatter');
const {Parser} = require('./src/parser');

const Discord = require('discord.js');
const client = new Discord.Client();

const NICKNAMES = { Just: 'just___', dysfunctional: 'dysfunctional_' };

let util = require('util');

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', command => {
  const discord_requester = command.author;

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(discord_requester.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(command.content.indexOf(config.prefix) !== 0) return;

  const pubg_nickname = get_pubg_nickname(command.author);

  let requested_stats = new Parser(command);
  requested_stats = requested_stats.parsed_commands;

  let return_stats = new Fetcher(pubg_nickname, requested_stats);
  let push_message = new Formatter(return_stats);

  let recipient;

  if (requested_stats.dm_message) {
    recipient = command.channel;
  } else {
    recipient = discord_requester;
  }

  let push_result = push_to_discord(recipient, push_message);

  // catch/handle push result exceptions
});

client.login(process.env.DISCORD_API_KEY);

function get_pubg_nickname(message_author) {
  return NICKNAMES[message_author.username];
}

function push_to_discord(recipient, push_message) {
// console.log("recipient: ", recipient);
// console.log("push_message: ", push_message);

  recipient.send(push_message);
}

// const fetch = new Fetcher('just____');
// const fetch = new Fetcher('dysfunctional_');

// let fetch_results = fetch.fetch();

// console.log(fetch_results);

// let push_result = new Promise(push_to_discord(fetch_results));
