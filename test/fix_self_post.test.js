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
})
