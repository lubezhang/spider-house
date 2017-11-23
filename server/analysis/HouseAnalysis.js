const { getSchema } = require('../../utils/mongoUtils');

class HouseAnalysis {
    /**
     * 
     * 
     * @static
     * @param {string} [houseSource=""] 房屋信息来源
     * @param {string} [lpName=""] 楼盘名称
     * @returns 
     * 
     * @memberOf HouseAnalysis
     */
    static getHouseList(houseSource = 'ajk', lpName = '') {
        return new Promise((resolve, reject) => {
            const HouseSchema = getSchema(houseSource);

            const groupOpts = [
                {
                    $group: {
                        _id: '$projectName',
                        projectName: {
                            $first: '$projectName',
                        },
                        averageSale: {
                            $avg: '$averageSale',
                        },
                        rows: {
                            $sum: 1,
                        },
                    },
                },
            ];

            if (lpName !== '') {
                // groupOpts = Object.assign([], groupOpts, {
                //     $match : {projectName: lpName}
                // })
                groupOpts.push({
                    $match: { projectName: lpName },
                });
            }

            HouseSchema.aggregate(groupOpts).exec((err, msg) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(msg);
                }
            });
        });
    }
}

module.exports = {
    HouseAnalysis,
};
