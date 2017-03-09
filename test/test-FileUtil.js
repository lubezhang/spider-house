let should = require('chai').should();
let expect = require('chai').expect
let fs = require("fs");
let rimraf = require("rimraf");
let { FileUtil } = require("../lib/utils/FileUtil.js")

const ROOT_PATH = __dirname + "/test-dir1";
const TEST_PATH = ROOT_PATH + "/test-dir2/test-dir3"

describe("FileUtil.js", function() {

    before(function() {
        if(fs.existsSync(ROOT_PATH)) {
            rimraf.sync(ROOT_PATH);
        }
    });

    after(function() {
        if(fs.existsSync(ROOT_PATH)) {
            rimraf.sync(ROOT_PATH);
        }
    });
 
    it('API is complete', function () {
        (typeof FileUtil).should.be.equal("function");
        expect(FileUtil.mkdirsSync).to.not.undefined;
        expect(FileUtil.writeFile).to.not.undefined;
        expect(FileUtil.writeJson).to.not.undefined;
    });

    it("mkdirsSync", function() {
        FileUtil.mkdirsSync(TEST_PATH).should.to.be.true; 
        fs.existsSync(TEST_PATH).should.to.be.true; 
    })

    it("writeFile", function() {
        
    })

    it("writeJson", function() {
        
    })
})