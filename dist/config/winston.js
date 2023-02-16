"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const nest_winston_1 = require("nest-winston");
const WinstonCloudWatch = require("winston-cloudwatch");
const config = require("config");
const isProduction = process.env.NODE_ENV === 'production';
const winstonConfig = config.get('winston');
exports.default = {
    format: winston.format.colorize(),
    exitOnError: false,
    transports: isProduction
        ? new WinstonCloudWatch({
            name: 'Ardwells CMS',
            awsOptions: {
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY || winstonConfig.awsAccessKeyId,
                    secretAccessKey: process.env.AWS_KEY_SECRET || winstonConfig.awsSecretAccessKey
                }
            },
            logGroupName: process.env.CLOUDWATCH_GROUP_NAME || winstonConfig.groupName,
            logStreamName: process.env.CLOUDWATCH_STREAM_NAME || winstonConfig.streamName,
            awsRegion: process.env.CLOUDWATCH_AWS_REGION || winstonConfig.awsRegion,
            messageFormatter: function (item) {
                return (item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta));
            }
        })
        : new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike('Ardwells Logger', {
                prettyPrint: true
            }))
        })
};
//# sourceMappingURL=winston.js.map