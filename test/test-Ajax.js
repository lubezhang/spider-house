let should = require('chai').should();
let expect = require('chai').expect
let { Ajax } = require("../lib/utils/Ajax.js")

describe("Ajax.js", function() {
    it('API is complete', function () {
        (typeof Ajax).should.be.equal("function");
        expect(Ajax.requestPageData).to.not.undefined;
        expect(Ajax.getPageDataUngzip).to.not.undefined;
        expect(Ajax.getPageData).to.not.undefined;
    });

    it('requestPageData', function () {

    })

    it('getPageData', function () {
        
    })

    it('getPageDataUngzip', function () {
        
    })
})