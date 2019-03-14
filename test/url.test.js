const assert = require('assert');
const helpers = require('../helpers');

describe('URL Modification', ()=>{
    describe("Base URL", ()=>{
      it("Shuld return a modified URL", function(){
        const res = helpers.url_refer("hackerqueue.com")
        assert.equal(res, "hackerqueue.com?utm_source=hackerqueue")
      });
    });
    describe("? Exists Alreardy", ()=>{
      it("should return the passed in url", ()=>{
        const url = "hackerqueue.com?utm_source=test"
        assert.equal(helpers.url_refer(url), url)
      })
    });
})