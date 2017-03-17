/* 是否为debug模式 */
const DEBUG = false;

/* mongodb 连接配置 */
const DB_CONNECT_CONFIG = {
    ip: "127.0.0.1",
    port: "27107",
    db_name: "house",
    username: "",
    password: ""
}

const HOUSE_SERVICE_CONFIG = {
    max_page: 1000,
    schedule_minute: [0]
}

// 抓取数据写入模式。 1：写入文件；2：写入mongodb。默认：1
const DATA_SAVE_MODE = 1; 

module.exports = {
    DEBUG,
    DB_CONNECT_CONFIG,
    HOUSE_SERVICE_CONFIG
}