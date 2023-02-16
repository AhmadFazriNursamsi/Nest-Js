/// <reference types="multer" />
export declare const multerOptionsHelper: (destinationPath: string, maxFileSize: number) => {
    limits: {
        fileSize: number;
    };
    fileFilter: (req: any, file: any, cb: any) => void;
    storage: import("multer").StorageEngine;
};
