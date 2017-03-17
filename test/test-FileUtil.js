let should = require('chai').should();
let expect = require('chai').expect
let fs = require("fs");
let rimraf = require("rimraf");
let { DATA_PATH } = require("../config")
let { FileUtil } = require("../utils/FileUtil.js")

const ROOT_PATH = __dirname + "/test-dir1";
const TEST_PATH = `${ROOT_PATH}/test-dir2/test-dir3`;

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
        expect(new FileUtil()).to.be.an.instanceof(FileUtil);
        expect(FileUtil.mkdirsSync).to.not.undefined;
        expect(typeof FileUtil.mkdirsSync).be.equal("function");
        expect(FileUtil.writeFile).to.not.undefined;
        expect(FileUtil.writeJson).to.not.undefined;
    });

    it("mkdirsSync", function() {
        FileUtil.mkdirsSync(TEST_PATH).should.to.be.true; 
        fs.existsSync(TEST_PATH).should.to.be.true; 
    })

    it("writeFile", function(done) {
        let filePath = `${TEST_PATH}/test.json`;
        FileUtil.writeFile(filePath, "test好").then(res => {
            fs.readFile(filePath, (err, data) => {
                expect(err).to.be.null;
                data.toString().should.to.equals("test好") 
                done();
            })
            
        })
    })

    it("writeJson", function(done) {
        FileUtil.writeJson("test", "test").then(res => {
            fs.readFile(res, (err, data) => {
                expect(err).to.be.null;
                data.toString().should.to.equals("test");

                rimraf.sync(`${DATA_PATH}/test`); 
                done()
            })
        })
    })
})