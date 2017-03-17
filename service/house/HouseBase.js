"use strict"

let { Ajax } = require("../../utils/Ajax");
let { FileUtil } = require("../../utils/FileUtil")
let { AJKSchema, FangSchema, getSchema } = require("../../utils/mongoUtils")
let { HOUSE_SERVICE_CONFIG, DATA_SAVE_MODE } = require("../../config/config")

class HouseBase {
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
        
        this.getLogger().info(`启动抓取数据服务【${this.name}】`)
        this.getHouseData(beginPageNum)
    }

    getUrl(pageNum) {
        return `${this.pageUrl}${pageNum}/`
    }

    saveData(data, saveType) {
        this.getLogger().info(`本次抓取【${data.length}】条数据`)

        if(saveType && saveType === 2) {
            if(data.length > 0) {
                let HouseSchema = getSchema(this.name);
                let house;
                for(let houseInfo of data) {
                    house = new HouseSchema(houseInfo);
                    house.save();
                }

                // HouseSchema.collection.insert(data, (err, docs) => {
                //     console.log(err);
                // }) 
            }
        } else {
            let saveData = data;
            if(typeof data === "object") {
                saveData = JSON.stringify(data)
            }
            FileUtil.writeJson(this.name, saveData).then(res => {
                this.getLogger().info(`停止抓取数据服务【${this.name}】，已经抓取【${this.stopPageNum}】页数据`)
                this.houseData = [];
            })
        }
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
                if(pageNum < HOUSE_SERVICE_CONFIG.max_page) {
                    pageNum++;
                    this.getHouseData(pageNum)
                } else {
                    this.stopPageNum = pageNum
                    this.saveData(this.houseData, DATA_SAVE_MODE);
                }
            }).catch(e => {
                this.getLogger().error(e);
                this.stopPageNum = pageNum
                this.saveData(this.houseData, DATA_SAVE_MODE);
            })
        // }
    }
}

module.exports = {
    HouseBase
};