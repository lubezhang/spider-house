"use strict"

let logger = require("./utils/logger").logger()
let { FileUtil } = require("./utils/FileUtil")

class HouseServer {
    constructor(dataSource) {
        this.dataSet = [];
        this.dataSource = dataSource;
    }

    start() {
        logger.info(`启动抓取数据服务【${this.dataSource.name}】`)
        // this.getData(1);
        this.dataSource.getHouseData(1)
    }

    stop() {
        logger.info(`停止抓取数据服务【${this.dataSource.name}】`)
        this.dataSet = [];
    }
}

module.exports = {
    HouseServer
}