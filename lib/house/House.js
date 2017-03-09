"use strict"

let { Ajax } = require("../utils/Ajax");
let { FileUtil } = require("../utils/FileUtil")
let logger = require("../utils/logger").logger()

class House {
    constructor() {
        this.name = "house";
        this.pageUrl = "";
        this.houseData = [];
        this.stopPageNum = 0;
        
        this.workQueue = [];
        this.stop = false;
    }

    analysis(pageData) {
        return [];
    }

    getPage() {
        return Promise.resolve();
    }

    stop() {
        this.stop = true;
    }

    getUrl(pageNum) {
        return `${this.pageUrl}${pageNum}/`
    }

    saveData(sourceName, data) {
        let saveData = data;
        if(typeof data === "object") {
            saveData = JSON.stringify(data)
        }
        FileUtil.writeJson(sourceName, saveData).then(res => {
            // logger.info("结束处理抓取的数据"); 
            logger.info(`停止抓取数据服务【${this.name}】，已经抓取【${this.stopPageNum}】页数据`)
            this.houseData = null;
        })
    }

    getJsonData(pageNum) {
        return new Promise((resolve, reject) => {
            this.getPage(this.getUrl(pageNum)).then(res => {
                let ajkData = this.analysis(res);
                if(ajkData.length === 0) {
                    reject("解析页面失败或已经到达最后一页");
                } else {
                    resolve(ajkData);
                }
            }).catch(e => {
                reject(e);
            })
        })
    }

    getHouseData(pageNum) {
        // if(this.workQueue && this.workQueue.length === 0) {
            this.getJsonData(pageNum).then(res => {
                 this.houseData = this.houseData.concat(res);
                if(pageNum < 300) {
                    pageNum++;
                    this.getHouseData(pageNum)
                } else {
                    this.stopPageNum = pageNum
                    this.saveData(this.name, this.houseData);
                }
            }).catch(e => {
                // logger.error(e);
                this.stopPageNum = pageNum
                this.saveData(this.name, this.houseData);
            })
        // }
    }
}

module.exports = {
    House
};