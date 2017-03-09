let log4js = require('log4js');
// log4js.configure(__dirname+"/../../log4js.json")
const logConfig = {
    "appenders": [
        {
            "type": "console",
            "category": "console"
        }
    ],
    "levels": {
        "console": "debug"
    },
    "replaceConsole": false
}

log4js.configure(logConfig, { reloadSecs: 300 });

exports.logger = (logName = "") => {
    return log4js.getLogger("console");
}