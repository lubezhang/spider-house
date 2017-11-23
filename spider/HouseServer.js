const HouseSchedule = require('./HouseSchedule').HouseSchedule;

const AJK = require('./house/AJK').AJK;
const Fang = require('./house/Fang').Fang;
const Focus = require('./house/Focus').Focus;

class HouseServer {
    constructor() {
        this.hs = new HouseSchedule([
            new AJK(),
            new Fang(),
            new Focus(),
        ]);
    }

    start() {
        this.hs.start();
    }

    stop() {
        this.hs.stop();
    }
}

module.exports = {
    HouseServer,
};
