"use strict"

let { FileUtil } = require("../../utils/FileUtil");
let { getSchema } = require("../../utils/mongoUtils");
let { DATA_SAVE_MODE, SERVICE_CONFIG_MAX_PAGE } = require("../../config/config");
let { isEmpty } = require("lodash");

class HouseBase {
    constructor() {
        this.name = "house";
        this.pageUrl = "";
        this.stopPageNum = 0;

        this.stop = false;
    }

    analysis(pageData = await  = []) {
        console.log(pageData = await );
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

    saveData(data = [], saveType) {
        // this.getLogger().info(`本次抓取【${data.length}】条数据`)

        if(saveType && saveType === 2) {
            if(data.length > 0) {
                let HouseSchema = getSchema(this.name);
                let house;
                for(let houseInfo of data) {
                    house = new HouseSchema(houseInfo);
                    house.save();
                }
                // this.getLogger().info(`停止抓取数据服务【${this.name}】，已经抓取【${this.stopPageNum}】页数据`)
                // this.houseData = [];
            }
        } else {
            let saveData = data;
            if(typeof data === "object") {
                saveData = JSON.stringify(data)
            }
            FileUtil.writeJson(this.name, saveData).then(res => {
                this.getLogger().debug(`生成数据文件【${res}】`)
                // this.getLogger().info(`停止抓取数据服务【${this.name}】，已经抓取【${this.stopPageNum}】页数据`)
                // this.houseData = [];
            })
        }
    }

    async getJsonData(pageNum) {
        let pageData = await this.getPage(this.getUrl(pageNum));
        return this.analysis(pageData)
    }

    async getHouseData(pageNum) {
        let data = [], houseDataList = [];
        while(!isEmpty(data = await this.getJsonData(pageNum))) {
            this.saveData(data, );
            this.stopPageNum = pageNum;
            pageNum++;
            
            // 抓取的数据大于定义的最大页数，跳出循环
            if(pageNum > SERVICE_CONFIG_MAX_PAGE) {
                break;
            }
        }
        this.getLogger().info(`停止抓取数据服务【${this.name}】，已经抓取【${this.stopPageNum}】页数据`)
    }
}

module.exports = {
    HouseBase
};