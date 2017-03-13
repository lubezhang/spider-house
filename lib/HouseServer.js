"use strict"

let HouseSchedule = require("./HouseSchedule").HouseSchedule;
let logger = require("./utils/logger").logger()
let { FileUtil } = require("./utils/FileUtil");

let AJK = require("./house/AJK").AJK;
let Fang = require("./house/Fang").Fang;

class HouseServer {
    constructor() {
        let ajk = new AJK();
        let fang = new Fang();
        let taskList = [ajk.start.bind(ajk), fang.start.bind(fang)];
        this.hs = new HouseSchedule(taskList);
    }

    start() {
        this.hs.start();
    }

    stop() {
        this.hs.stop();
    }
}

module.exports = {
    HouseServer
}