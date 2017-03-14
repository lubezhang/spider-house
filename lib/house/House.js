"use strict"

let { Ajax } = require("../utils/Ajax");
let { FileUtil } = require("../utils/FileUtil")

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

    getLogger() {
        return;
    }

    stop() {
        this.stop = false;
    }
    
    start(beginPageNum = 1) {
        
        this.getLogger().info(`启动抓取数据服务【${this.name}】`, beginPageNum)
        this.getHouseData(beginPageNum)
    }

    getUrl(pageNum) {
        return `${this.pageUrl}${pageNum}/`
    }

    saveData(data) {
        let saveData = data;
        if(typeof data === "object") {
            saveData = JSON.stringify(data)
        }
        FileUtil.writeJson(this.name, saveData).then(res => {
            this.getLogger().info(`停止抓取数据服务【${this.name}】，已经抓取【${this.stopPageNum}】页数据`)
            this.houseData = [];
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
                if(pageNum < 1000) {
                    pageNum++;
                    this.getHouseData(pageNum)
                } else {
                    this.stopPageNum = pageNum
                    this.saveData(this.houseData);
                }
            }).catch(e => {
                this.getLogger().error(e);
                this.stopPageNum = pageNum
                this.saveData(this.houseData);
            })
        // }
    }
}

module.exports = {
    House
};