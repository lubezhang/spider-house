const schedule = require('node-schedule');
const logger = require('../utils/logger').logger();
const { SERVICE_CONFIG_SCHEDULE_TYPE } = require('../config/config');

class HouseSchedule {
    constructor(taskList) {
        this.taskList = taskList;
        this.scheduleJob = null;
    }

    start() {
        logger.info('定时任务 - 开始');
        if (SERVICE_CONFIG_SCHEDULE_TYPE === 0) {
            this.executeJob();
        } else {
            this.scheduleJob = schedule
                .scheduleJob(this.createScheduleRule(), this.executeJob.bind(this));
        }
    }

    stop() {
        logger.info('定时任务 - 取消');
        this.scheduleJob.cancel();
    }

    createScheduleRule() {
        const rule = new schedule.RecurrenceRule();

        // 每天凌晨3点抓一次数据
        // rule.hour = 11;

        // 一小时抓一次数据 
        // rule.minute = HOUSE_SERVICE_CONFIG.schedule_minute;

        // rule.second = [0, 20, 40, 59]; // 测试规则

        switch (SERVICE_CONFIG_SCHEDULE_TYPE) {
        case 1:
            rule.hour = 0;
            break;
        case 2:
            rule.minute = 0;
            break;
        case 3:
            rule.second = 0;
            break;
        default:
            rule.hour = 0;
            break;
        }

        return rule;
    }

    executeJob() {
        logger.debug('');
        logger.debug('==================== executeJob =======================');
        // for (let house of this.taskList) {
        //     if (house && house.start) {
        //         house.start();
        //     }
        // }

        this.taskList.forEach((house) => {
            if (house && house.start) {
                house.start();
            }
        }, this);
    }
}

module.exports = {
    HouseSchedule,
};
