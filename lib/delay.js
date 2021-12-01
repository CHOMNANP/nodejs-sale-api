const delay = async function (_milisecond, callback) {
    return new Promise(async (resolve, reject) => {
        let wait = setTimeout(async () => {
            if (callback) {
                await callback();
            }
            resolve('Delayed successfully!');
        }, _milisecond);
    });
};

module.exports = {
    delay
};
