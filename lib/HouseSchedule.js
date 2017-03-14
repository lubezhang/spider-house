"use strict"

let schedule = require('node-schedule');
let logger = require("./utils/logger").logger()

class HouseSchedule {
    constructor(taskList) {
        this.taskList = taskList;
        this.scheduleJob;
    }

    start() {
        logger.info("定时任务 - 开始");
        // this.executeJob();
        this.scheduleJob = schedule.scheduleJob(this.createScheduleRule(), this.executeJob.bind(this));
    }

    stop() {
        logger.info("定时任务 - 取消");
        this.scheduleJob.cancel();
    }

    createScheduleRule() {
        let rule = new schedule.RecurrenceRule();
        
        // 每天凌晨3点抓一次数据
        // rule.hour = 11;

        // 一小时抓一次数据 
        rule.minute = 00;

        // rule.second = [0, 20, 40, 59]; // 测试规则
        return rule;
    }

    executeJob() {
        logger.debug('');
        logger.debug('==================== executeJob =======================');
        // for(let funStart of this.taskList) {
        //     funStart && "function" === typeof funStart && funStart();
        // }
        for(let house of this.taskList) {
            if(house && house.start) {
                house.start();
            }
        }
    }
}

module.exports = {
    HouseSchedule
}