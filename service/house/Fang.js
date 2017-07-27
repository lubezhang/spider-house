const cheerio = require('cheerio');
const { HouseBase } = require('./HouseBase');
const { Ajax } = require('../../utils/Ajax');
const { getLogger } = require('../../utils/logger');

const BASE_URL = 'http://newhouse.fang.com/house/s/b9';

class Fang extends HouseBase {
    constructor() {
        super();
        this.name = 'Fang';
        this.pageUrl = BASE_URL;
    }

    getLogger() {
        return getLogger('Fang');
    }

    getPage(url) {
        return Ajax.getPageDataUngzip(url, 'gb2312');
    }

    analysis(pageData) {
        const dataList = [];
        const $ = cheerio.load(pageData, { decodeEntities: false });
        const houseInfoList = $('.nhouse_list li');

        for (let i = 0, len = houseInfoList.length; i < len; i++) {
            try {
                const $house = $(houseInfoList[i]);
                const projectName = $house.find('.nlcd_name > a').text().replace(/[\t\n ]*/g, '');
                if ($house.find('.nhouse_price').length === 0) {
                    break;
                }
                const averageSale = $house.find('.nhouse_price span').text();
                let discountSale = '';
                if (!averageSale) {
                    discountSale = $house.find('.discount-item p.favor-tag span').text();
                }

                dataList.push({
                    projectName,
                    averageSale: averageSale || 0,
                    discountSale: discountSale || 0,
                });
            } catch (e) {
                console.log(e);
            }
        }
        return dataList;
    }
}

module.exports = {
    Fang,
};

