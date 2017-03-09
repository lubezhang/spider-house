"use strict"

let cheerio = require("cheerio");
let moment = require("moment");
let { House } = require("./House")
let { Ajax } = require("../utils/Ajax");

const BASE_URL = "http://bj.fang.anjuke.com/loupan/all/p";

class AJK extends House {
    constructor() {
        super();
        this.name = "ajk";
        this.pageUrl = BASE_URL;
    }

    getPage(url) {
        return Ajax.getPageData(url);
    }

    analysis(pageData) {
        let ajkData = [];
        let $ = cheerio.load(pageData, {decodeEntities: false});
        let houseInfoList = $(".key-list > .item-mod");
        for(let i = 0, len = houseInfoList.length; i < len; i++) {
            try {
                let $house = $(houseInfoList[i]);
                let projectName = $house.find(".lp-name a.items-name").text();
                let averageSale = $house.find(".favor-pos p.price span").text();
                let discountSale = "";
                if(!averageSale) {
                    discountSale = $house.find(".discount-item p.favor-tag span").text();
                }

                ajkData.push({
                    projectName: projectName,
                    averageSale: averageSale || 0,
                    discountSale: discountSale || 0
                })

            } catch (e) {
                console.log(e);
            }
        }
        return ajkData;
    }
}

module.exports = {
    AJK
}




