let http = require("http");
let zlib = require("zlib");
let request = require("request");
var iconv = require('iconv-lite');

let logger = require("./logger").logger()

class Ajax {
    static requestPageData(url, isZip, encoding) {
        logger.debug("url: ", url)
        return new Promise((resolve, reject) => {
            let options = {
                url : url,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
                }
            }

            if(isZip === true) {
                options.encoding = null;
                options.headers["Accept-Encoding"] = "gzip";
            }

            request.get(options, (error, response, body) => {
                let html = "";

                if(error) {
                    reject(error)
                } else {
                    if(isZip === true) {
                        zlib.unzip(body, function(err, buffer) {
                            if(typeof encoding === "string" && encoding !== "") {
                                html = iconv.decode(buffer, encoding)
                            } else {
                                html = body;
                            }
                            resolve(html)
                        });
                    } else {
                        resolve(body)
                    }
                }
            });

        })
    }

    static getPageData(url, encoding) {
        return this.requestPageData(url, false)
    }

    static getPageDataUngzip(url, encoding) {
        return this.requestPageData(url, true, encoding)
    }
}

module.exports = {
    Ajax
}