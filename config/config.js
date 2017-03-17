/* 是否为debug模式 */
const DEBUG = false;

/* mongodb 连接配置 */
const DB_CONNECT_CONFIG = {
    ip: "127.0.0.1",
    port: "27107",
    username: "",
    password: ""
}

const HOUSE_SERVICE_CONFIG = {
    max_page: 1000,
    schedule_minute: [0]
}

module.exports = {
    DEBUG,
    DB_CONNECT_CONFIG,
    HOUSE_SERVICE_CONFIG
}