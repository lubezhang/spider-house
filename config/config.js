/** 是否为debug模式 */
const DEBUG = false;

const LOGGER_LEVEL = "info";

/** mongodb 连接配置 */
const DB_CONNECT_CONFIG = {
    ip: "10.74.120.119",
    port: "27017",
    db_name: "house",
    username: "",
    password: ""
}

/* 数据抓取的最大页数 */
const SERVICE_CONFIG_MAX_PAGE = 1000;
/* 0: 立即抓取一次；1：每天0点抓取；2：每小时0分抓取；3：每分钟0秒抓取； */
const SERVICE_CONFIG_SCHEDULE_TYPE = 1;

/** 抓取数据写入模式。 1：写入文件；2：写入mongodb。默认：1 */
const DATA_SAVE_MODE = 2; 

/** 项目根路径 */
const ROOT_PATH = __dirname + "/../";

/** 房屋信息来源 */
const HOUSE_SOURCE = {
    AJK: "ajk",
    FANG: "fang",
    FOCUS: "Focus"
}

module.exports = {
    DEBUG,
    DB_CONNECT_CONFIG,
    DATA_SAVE_MODE,
    ROOT_PATH,
    HOUSE_SOURCE,
    LOGGER_LEVEL,
    SERVICE_CONFIG_MAX_PAGE,
    SERVICE_CONFIG_SCHEDULE_TYPE
}