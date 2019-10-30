const assert = require('assert');
const helpers = require('../helpers');

describe('Self Post URL Modification', ()=>{
    describe("helpers.fixSelfPost(base_url, url) with sufficient input for modification", ()=>{
      it("Should return a modified url", function(){
				const expected = "http://lobste.rs/s/bisicp/commas_big_numbers_everywhere_opentype"
        const res = helpers.fixSelfPost("http://lobste.rs/s/", "bisicp/commas_big_numbers_everywhere_opentype")
				assert.equal(res, expected)
      });
    });

    describe("helpers.fixSelfPost(base_url, url) with insufficient input for modification", ()=>{
      it("Should return base url", function(){
				const expected = "http://lobste.rs/s/"
        const res = helpers.fixSelfPost("http://lobste.rs/s/", null)
				assert.equal(res, expected)
      });
    });

    describe("helpers.fixSelfPost(base_url, url) with sufficient input for modification, but it isn't needed", ()=>{
      it("Should return a the url without modification", function(){
				const expected = "https://www.reddit.com/r/programming/comments/doy3uu/my_most_embarrassing_mistakes_as_a_programmer_so"
        const res = helpers.fixSelfPost("http://reddit.com/r/programming/", "https://www.reddit.com/r/programming/comments/doy3uu/my_most_embarrassing_mistakes_as_a_programmer_so")
				assert.equal(res, expected)
      });
    });
})
