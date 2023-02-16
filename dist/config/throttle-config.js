"use strict";
const nestjs_throttler_storage_redis_1 = require("nestjs-throttler-storage-redis");
const config = require("config");
const throttleConfigVariables = config.get('throttle.global');
const redisConfig = config.get('queue');
const throttleConfig = {
    ttl: process.env.THROTTLE_TTL || throttleConfigVariables.get('ttl'),
    limit: process.env.THROTTLE_LIMIT || throttleConfigVariables.get('limit'),
    storage: new nestjs_throttler_storage_redis_1.ThrottlerStorageRedisService({
        host: process.env.REDIS_HOST || redisConfig.host,
        port: process.env.REDIS_PORT || redisConfig.port,
        password: process.env.REDIS_PASSWORD || redisConfig.password
    })
};
module.exports = throttleConfig;
//# sourceMappingURL=throttle-config.js.map