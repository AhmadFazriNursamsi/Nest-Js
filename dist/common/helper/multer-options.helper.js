"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptionsHelper = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const custom_http_exception_1 = require("../../exception/custom-http.exception");
const status_codes_list_constants_1 = require("../constants/status-codes-list.constants");
const multerOptionsHelper = (destinationPath, maxFileSize) => ({
    limits: {
        fileSize: +maxFileSize
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        }
        else {
            cb(new custom_http_exception_1.CustomHttpException('unsupportedFileType', common_1.HttpStatus.BAD_REQUEST, status_codes_list_constants_1.StatusCodesList.UnsupportedFileType), false);
        }
    },
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            if (!(0, fs_1.existsSync)(destinationPath)) {
                (0, fs_1.mkdirSync)(destinationPath);
            }
            cb(null, destinationPath);
        },
        filename: (req, file, cb) => {
            cb(null, `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`);
        }
    })
});
exports.multerOptionsHelper = multerOptionsHelper;
//# sourceMappingURL=multer-options.helper.js.map