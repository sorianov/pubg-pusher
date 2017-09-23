var assert = require('assert');
describe('Array', function() {
  describe('#fetcher()', function() {
    it('fetches stats for individual or a group of players', function() {
      // assert.equal(-1, [1,2,3].fetcher("just____"));

      var stats = fetcher("just____")

      expect(stats.match_history.first.kills).to.be(4);

      stats.should.have.property('Wins', '4')
    });
  });
});
