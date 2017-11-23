const should = require('chai').should();
const expect = require('chai').expect;
const { HouseAnalysis } = require('../server/analysis/HouseAnalysis');
const { HOUSE_SOURCE } = require('../config/config');

describe('HouseAnalysis.js', () => {
    it('Class is exist', () => {
        (typeof HouseAnalysis).should.be.equal('function');
        // expect(Ajax.requestPageData).to.not.undefined;
        // expect(Ajax.getPageDataUngzip).to.not.undefined;
        // expect(Ajax.getPageData).to.not.undefined;
    });

    it('getHouseList', (done) => {
        const lpName = '富力';
        HouseAnalysis.getHouseList(HOUSE_SOURCE.AJK, lpName).then((res) => {
            expect(res).to.not.empty;
            // res[0].projectName.should.to.be.equal(lpName);
            // console.log(res);
            // res.
            done();
        });
    });
});
