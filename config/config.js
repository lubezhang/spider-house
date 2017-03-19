/* 是否为debug模式 */
const DEBUG = false;

/* mongodb 连接配置 */
const DB_CONNECT_CONFIG = {
    ip: "10.16.93.35",
    port: "27107",
    db_name: "house",
    username: "",
    password: ""
}

const HOUSE_SERVICE_CONFIG = {
    max_page: 1000,
    schedule_type: 1    // 0: 立即抓取一次；1：每天0点抓取；2：每小时0分抓取；3：每分钟0秒抓取；
}

// 抓取数据写入模式。 1：写入文件；2：写入mongodb。默认：1
const DATA_SAVE_MODE = 1; 

const ROOT_PATH = __dirname + "/../";

module.exports = {
    DEBUG,
    DB_CONNECT_CONFIG,
    HOUSE_SERVICE_CONFIG,
    DATA_SAVE_MODE,
    ROOT_PATH
}