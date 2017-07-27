const mongoose = require('mongoose');
const { DB_CONNECT_CONFIG } = require('../config/config');

mongoose.connect(`mongodb://${DB_CONNECT_CONFIG.ip}/${DB_CONNECT_CONFIG.db_name}`);// ；连接数据库
mongoose.connection.on('error', (err) => {
    console.log('mongodb 连接错误：', err);
});

const Schema = mongoose.Schema;
const HouseSchema = new Schema({
    projectName: { // 项目名称 
        type: String,
        required: true,
        trim: true,
    },
    averageSale: Number, // 均价                            
    discountSale: Number, // 周边均价
    createTime: Date, // 数据采集时间
    updateTime: Date, // 数据更新时间
});

HouseSchema.pre('save', (next) => {
    const now = new Date();
    this.updateTime = now;
    if (!this.createTime) {
        this.createTime = now;
    }
    next();
});

module.exports = {
    getSchema: schemaName => mongoose.model(schemaName, HouseSchema),
}
;
