"use strict"

let HouseSchedule = require("./HouseSchedule").HouseSchedule;

let AJK = require("./house/AJK").AJK;
let Fang = require("./house/Fang").Fang;

class HouseServer {
    constructor() {
        this.hs = new HouseSchedule([new AJK(), new Fang()]);
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