const log4js = require('log4js');
const log4js1 = require('log4js');
const { LOGGER_LEVEL } = require('../config/config.js');
// log4js.configure(__dirname+"/../../log4js.json")
const logConfig = {
    appenders: [
        {
            type: 'console',
        },
    ],
    levels: {
        console: LOGGER_LEVEL,
    },
    replaceConsole: false,
};

log4js.configure(logConfig, { reloadSecs: 300 });

module.exports = {
    logger: () => log4js.getLogger('console'),
    getLogger: (houseSrcName) => {
        const cusLogConfig = {
            appenders: [
                {
                    type: 'console',
                },
                { type: 'file', filename: `logs/${houseSrcName}.log`, category: houseSrcName },
            ],
            levels: {
                console: 'debug',
                file: 'debug',
            },
        };
        // console.log(cusLogConfig);

        log4js1.configure(cusLogConfig, { reloadSecs: 300 });

        return log4js1.getLogger(houseSrcName);
    },
};
