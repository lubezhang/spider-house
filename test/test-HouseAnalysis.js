let should = require('chai').should();
let expect = require('chai').expect
let { HouseAnalysis } = require("../service/HouseAnalysis")
let { HOUSE_SOURCE } = require("../config/config")

describe("HouseAnalysis.js", function() {
    it('Class is exist', () => {
        (typeof HouseAnalysis).should.be.equal("function");
        // expect(Ajax.requestPageData).to.not.undefined;
        // expect(Ajax.getPageDataUngzip).to.not.undefined;
        // expect(Ajax.getPageData).to.not.undefined;
    });

    it('getHouseList', (done) => { 
        let lpName = "中信墅"
        HouseAnalysis.getHouseList(HOUSE_SOURCE.AJK, lpName).then(res => {
            expect(res).to.not.empty;
            res[0].projectName.should.to.be.equal(lpName)
            // console.log(res);
            // res.
            done()
        })
    })

})