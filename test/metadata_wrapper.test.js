const assert = require('assert');
const helpers = require('../helpers');

describe('MetaData Array Modification', ()=>{
    describe("Wrapper", ()=>{
      it("Shuld return a JSON object instead of an Array", function(){
        const res = helpers.wrap([{url: "localhost:3000"}])
				assert.equal(res.Crawls.length, 1)
      });
    });
})
