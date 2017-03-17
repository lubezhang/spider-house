let mongoose = require("mongoose");
let moment = require("moment");

let db = mongoose.connect('mongodb://10.16.93.35/house');//；连接数据库
mongoose.connection.on('error', function(err){
    console.log("mongodb 连接错误：", err);
});

let Schema = mongoose.Schema;
let HouseSchema = new Schema({
	projectName: { type: String, required: true, trim: true },
	averageSale: Number,
    discountSale: Number,
    createTime: Date,
    updateTime: Date
});

HouseSchema.pre('save', function (next) {
    let now = new Date();
    this.updateTime = now;
    if (!this.createTime) {
        this.createTime = now;
    }
    next();
});

module.exports = {
    getSchema: (schemaName) => {
        return mongoose.model(schemaName, HouseSchema);
    }
}