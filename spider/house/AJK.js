const cheerio = require('cheerio');
const { HouseBase } = require('./HouseBase');
const { Ajax } = require('../../utils/Ajax');
const { getLogger } = require('../../utils/logger');

const BASE_URL = 'http://bj.fang.anjuke.com/loupan/all/p';

class AJK extends HouseBase {
    constructor() {
        super();
        this.name = 'AJK';
        this.pageUrl = BASE_URL;
    }

    getPage(url) {
        return Ajax.getPageData(url);
    }

    getLogger() {
        return getLogger('AJK');
    }

    analysis(pageData) {
        const ajkData = [];
        const $ = cheerio.load(pageData, { decodeEntities: false });
        const houseInfoList = $('.key-list > .item-mod');
        for (let i = 0, len = houseInfoList.length; i < len; i++) {
            try {
                const $house = $(houseInfoList[i]);
                const projectName = $house.find('.lp-name a.items-name').text();
                const averageSale = $house.find('.favor-pos p.price span').text();
                let discountSale = '';
                if (!averageSale) {
                    discountSale = $house.find('.discount-item p.favor-tag span').text();
                }

                ajkData.push({
                    projectName,
                    averageSale: averageSale || 0,
                    discountSale: discountSale || 0,
                });
            } catch (e) {
                console.log(e);
            }
        }
        return ajkData;
    }
}

module.exports = {
    AJK,
};

