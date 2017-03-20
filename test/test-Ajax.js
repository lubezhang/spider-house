let should = require('chai').should();
let expect = require('chai').expect
let cheerio = require("cheerio");
let { Ajax } = require("../utils/Ajax.js")

describe("Ajax.js", function() {
    it('API is complete', function () {
        (typeof Ajax).should.be.equal("function");
        expect(Ajax.requestPageData).to.not.undefined;
        expect(Ajax.getPageDataUngzip).to.not.undefined;
        expect(Ajax.getPageData).to.not.undefined;
    });

    it('requestPageData', function () {

    })

    it('getPageData', function (done) {
        let url = "https://www.baidu.com/"
        Ajax.getPageData(url).then(pageData => {
            let $ = cheerio.load(pageData);
            expect($("#su").val()).to.not.undefined;
            expect($("#su").val()).to.equal("百度一下")
            done();
        })
    })

    it('getPageDataUngzip', function (done) {
        let url = "https://www.baidu.com/"
        Ajax.getPageDataUngzip(url).then(pageData => {
            // console.log(pageData);
            let $ = cheerio.load(pageData);
            // console.log($("#su").val());
            // expect($("#su").val()).to.not.undefined;
            // expect($("#su").val()).to.equal("百度一下")
            done();
        })
    })
})