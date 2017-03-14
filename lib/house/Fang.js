"use strict"

let cheerio = require("cheerio");
let { House } = require("./House")
let { Ajax } = require("../utils/Ajax");
let { getLogger } = require("../utils/logger")

const BASE_URL = "http://newhouse.fang.com/house/s/b9";

class Fang extends House {
    constructor() {
        super();
        this.name = "Fang";
        this.pageUrl = BASE_URL;
    }

    getLogger() {
        return getLogger("Fang")
    }

    getPage(url) {
        return Ajax.getPageDataUngzip(url, "gb2312");
    }

    analysis(pageData) {
        let dataList = [];
        let $ = cheerio.load(pageData, {decodeEntities: false});
        let houseInfoList = $(".nhouse_list li");

        for(let i = 0, len = houseInfoList.length; i < len; i++) {
            try {
                let $house = $(houseInfoList[i]);
                let projectName = $house.find(".nlcd_name > a").text().replace(/[\t\n ]*/g, "");
                if($house.find(".nhouse_price").length === 0) {
                    break;
                }
                let averageSale = $house.find(".nhouse_price span").text();
                let discountSale = "";
                if(!averageSale) {
                    discountSale = $house.find(".discount-item p.favor-tag span").text();
                }

                dataList.push({
                    projectName: projectName,
                    averageSale: averageSale || 0,
                    discountSale: discountSale || 0
                })
            } catch(e) {
                console.log(e);
            }
        }
        return dataList;
    }
}

module.exports = {
    Fang
}




