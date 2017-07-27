const cheerio = require('cheerio');
const { HouseBase } = require('./HouseBase');
const { Ajax } = require('../../utils/Ajax');
const { getLogger } = require('../../utils/logger');

const BASE_URL = 'http://house.focus.cn/search/index_p5.html';

class Focus extends HouseBase {
    constructor() {
        super();
        this.name = 'Focus';
        this.pageUrl = BASE_URL;
    }

    getPage(url) {
        return Ajax.getPageData(url);
    }

    getLogger() {
        return getLogger('AJK');
    }

    getUrl(pageNum) {
        return `http://house.focus.cn/search/index_p${pageNum}.html`;
    }

    analysis(pageData) {
        const ajkData = [];
        const $ = cheerio.load(pageData, { decodeEntities: false });
        const houseInfoList = $('.s-lp-list > .lp-list-li');
        for (let i = 0, len = houseInfoList.length; i < len; i++) {
            try {
                const $house = $(houseInfoList[i]);

                const projectName = $house.find('.lp-t-title a').text();
                const averageSale = $house.find('.lp-s-price strong.f-family').text();
                const discountSale = 0;
                // if(!averageSale) {
                //     discountSale = $house.find(".discount-item p.favor-tag span").text();
                // }

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
    Focus,
};

