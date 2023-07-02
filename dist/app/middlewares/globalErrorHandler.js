"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
// এসব ভ্যালু এর ক্ষেত্রে টাইপ predict করা যায়না ।
const globalErrorHandler = (error, req, res, next) => {
    config_1.default.env == 'development'
        ? console.log('🚀 globalErrorHandler', error)
        : console.log('🚀 globalErrorHandler errorLogger', error);
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages = [];
    // If error coming from mongoose validation error
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    // Zod Error
    else if (error instanceof zod_1.ZodError) {
        const simplifierZodError = (0, handleZodError_1.default)(error);
        statusCode = simplifierZodError.statusCode;
        message = simplifierZodError.message;
        errorMessages = simplifierZodError.errorMessages;
    }
    // Cast error : mongoose id search e id lenth thik na thakle
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    // api এরর
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = error.message
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    // If it's normal error like : api error
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        //  IF message is an empty string and we want to validate our Interface, also to maintain out consistency
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    //   Generic Error Pattern for frontend
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined, // depend korbe .env NODE_ENV উপর
    });
};
exports.default = globalErrorHandler;
