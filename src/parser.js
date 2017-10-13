const {MalformedStatRequest} = require('./custom_errors');
const config = require('./config');

class Parser {

  // constructor(command) {
  //   this.parsed_commands = this.parse_commands(command);
  // }

  parse_commands(command) {
    const VALID_STATS = ['lm', 'round', 'hs', 'damage', 'top', 'day', 'week', 'vs'];
    const VALID_COMMANDS = ['register', 'remove', 'help'];

    let requested_stats = [];
    let commands = [];

// Here we separate our "command" name, and our "arguments" for the command.
// e.g. if we have the message "!say Is this the real life?" , we'll get the following:
// command = say
// args = ["Is", "this", "the", "real", "life?"]

    let args = command.content.slice(config.prefix.length).trim().split(/ +/g);
    let lower_case_commands = []

    lower_case_commands.push( args.shift().toLowerCase() );

    requested_stats = lower_case_commands.map( (element) => {
      if ( VALID_STATS.includes(element) ) {
        return element;
      }
    });

    commands = lower_case_commands.map( (element) => {
      if (VALID_COMMANDS.includes(element)) {
        return element;
      }
    });

    if ( requested_stats.includes(undefined) && commands.includes(undefined) ) {
      throw new MalformedStatRequest();
    }

    if ( commands.includes('register') && commands.includes('remove') ) {
      throw new MalformedStatRequest('Only one command may be used');
    }

    if ( requested_stats.includes('day') && requested_stats.includes('week') ) {
      throw new MalformedStatRequest('Only one timeframe may be used');
    }

    return { requested_stats: requested_stats, commands: commands };
  }

};

module.exports = {
  Parser
};



