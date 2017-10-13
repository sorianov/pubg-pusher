const {Parser} = require('../src/parser');
const customMatchers = require('./helpers/custom_matchers.js');
const {MalformedStatRequest} = require('../src/custom_errors');

describe("Parser", function() {
  let parser = new Parser();
  let command = {};

  beforeEach(function() {
    command = {};
  });

  afterEach(function() {
    command = {};
  });

  describe("parse_commands(command)", function() {
    it("should parse command.content containing 'lm' and return ['lm']", function() {
      command.content = '!lm';

      let parsed_command = parser.parse_commands(command);

      expect(parsed_command.requested_stats).toInclude('lm');
    });

    it("should parse command.content containing 'caaalm' and not return ['lm']", function() {
      command.content = '!calm hs';
      let parsed_command;

      let parse_commands_call = function() {
        parsed_command = parser.parse_commands(command);
      };

      expect(parsed_command).not.toInclude('lm');
    });

    it("should throw an error when no valid commands were entered", function() {
      command.content = '!calm';

      let parse_commands_call = function() {
        parser.parse_commands(command);
      };

      expect(parse_commands_call).toThrowError(MalformedStatRequest, "No valid commands were entered");
    });
  });
});
