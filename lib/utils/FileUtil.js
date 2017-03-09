"use strict"

let fs =  require('fs');
let path =  require('path');
let moment =  require("moment");
let logger = require("./logger").logger()
let { DATA_PATH } = require("../../config")

const BASE_PATH = __dirname + "/../../";

class FileUtil {
    constructor() {

    }

    //递归创建目录 同步方法  
    static mkdirsSync(dirname) {  
        if (fs.existsSync(dirname)) {  
            return true;  
        } else {  
            if (this.mkdirsSync(path.dirname(dirname))) {  
                fs.mkdirSync(dirname);
                return true;  
            }  
        }  
    } 

    static writeFile(basePath, data) {
        // logger.debug("生成数据文件：", basePath)
        return new Promise((resolve, reject) => {
            fs.appendFile(basePath, data, (err) => {
                /* istanbul ignore if  */
                if (err) {
                    reject(err);
                }

                resolve(basePath);
            });
        })
    }

    /**
     * 
     * 
     * @static
     * @param {any} moduleName 
     * @param {any} data 
     * @returns 
     * 
     * @memberOf FileUtil
     */
    static writeJson(moduleName, data) {
        return new Promise((resolve, reject) => {
            let filePath = `${DATA_PATH}/${moduleName}`;
            this.mkdirsSync(filePath);
            this.writeFile(`${filePath}/${moment().format('YYYY-MM-DD_HH:mm:ss')}.json`, data).then(res => {
                resolve(res);
            }).catch(e => {
                /* istanbul ignore next */
                reject(e);
            })
        })
    }
}

module.exports = {
    FileUtil
}