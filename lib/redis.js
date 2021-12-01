const node_redis = require("redis");
const bluebird = require("bluebird");
const { redis: redisConfig } = require("./config");
// console.log("redisConfig", redisConfig);

bluebird.promisifyAll(node_redis.RedisClient.prototype);
bluebird.promisifyAll(node_redis.Multi.prototype);
const redisOnce = node_redis.createClient(redisConfig);

module.exports = {
    once: redisOnce
};