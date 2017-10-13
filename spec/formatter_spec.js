const {Formatter} = require('../src/formatter')
const customMatchers = require('./helpers/custom_matchers.js')
const {MalformedStatRequest} = require('../src/custom_errors')

describe('Formatter', function () {
  let return_stats = { hs: 5, damage: 345 }

  beforeEach(function () {

  })

  afterEach(function () {

  })

  describe('format_stats()', function () {
    it('should format stats in a human readable way', function () {
      let formatter = new Formatter('dysfunctional_', return_stats)

      let formatted_stats = formatter.format_stats()

      expect(formatted_stats).toBe('For dysfunctional_, Headshots: 5, Damage: 345')
    })
  })
})
