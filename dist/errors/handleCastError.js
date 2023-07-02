"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    /* "error": {
          "stringValue": "\"649c9e823ad21d226c13b2\"",
          "valueType": "string",
          "kind": "ObjectId",
          "value": "649c9e823ad21d226c13b2",
          "path": "_id",
          "reason": {},
          "name": "CastError",
          "message": "Cast to ObjectId failed for value \"649c9e823ad21d226c13b2\" (type string) at path \"_id\" for model \"AcademicSemester\""
      } */
    const errors = [
        {
            path: error.path,
            message: 'Invalid Id',
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error',
        errorMessages: errors,
    };
};
exports.default = handleCastError;
