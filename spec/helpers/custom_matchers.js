let customMatchers = {
    toInclude : function(util, customEqualityTesters) {
        return {
            compare : function(actual, expected) {

                if (expected === undefined) {
                  expected = '';
                }
                if (actual === undefined) {
                  actual = [];
                }

                var result = {};

                result.pass = actual.includes(expected);

                if(result.pass) {
                    result.message = 'Expected ' + actual + ' to include ' + expected;
                }
                else {
                    result.message = 'Expected ' + actual + ' to include ' + expected + ' but it was not found';
                }
                return result;
            }
        };
    }
};

beforeEach(function() {
  jasmine.addMatchers(customMatchers);
});
