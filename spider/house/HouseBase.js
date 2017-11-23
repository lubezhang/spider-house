const { FileUtil } = require('../../utils/FileUtil');
const { getSchema } = require('../../utils/mongoUtils');
const { DATA_SAVE_MODE, SERVICE_CONFIG_MAX_PAGE } = require('../../config/config');
const { isEmpty } = require('lodash');

class HouseBase {
    constructor() {
        this.name = 'house';
        this.pageUrl = '';
        this.stopPageNum = 0;

        this.stop = false;
    }

    stop() {
        this.stop = false;
    }

    async start(beginPageNum = 1) {
        this.getLogger().info(`启动抓取数据服务【${this.name}】`);
        this.stopPageNum = await this.getHouseData(beginPageNum);
        this.getLogger().info(`停止抓取数据服务【${this.name}】，已经抓取【${this.stopPageNum}】页数据`);
    }

    getUrl(pageNum) {
        return `${this.pageUrl}${pageNum}/`;
    }

    saveData(data = [], saveType) {
        if (saveType && saveType === 2) {
            if (data.length > 0) {
                const HouseSchema = getSchema(this.name);
                let house;
                for (const houseInfo of data) {
                    house = new HouseSchema(houseInfo);
                    house.save();
                }
            }
        } else {
            let saveData = data;
            if (typeof data === 'object') {
                saveData = JSON.stringify(data);
            }
            FileUtil.writeJson(this.name, saveData).then((res) => {
                this.getLogger().debug(`生成数据文件【${res}】`);
            });
        }
    }

    async getJsonData(pageNum) {
        const pageData = await this.getPage(this.getUrl(pageNum));
        return this.analysis(pageData);
    }

    async getHouseData(startPageNum) {
        let data = [];
        let pageNum = startPageNum;

        do {
            data = await this.getJsonData(pageNum);
            this.saveData(data, DATA_SAVE_MODE);
            pageNum += 1;

            // 抓取的数据大于定义的最大页数，跳出循环
            if (pageNum > SERVICE_CONFIG_MAX_PAGE) {
                break;
            }
        } while (!isEmpty(data));

        return pageNum;
    }
}

module.exports = {
    HouseBase,
};
