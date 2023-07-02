"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constants_1 = require("./academicSemester.constants");
const createAcademicSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum(academicSemester_constants_1.academicSemesterTitles, {
            required_error: 'title is required',
        }),
        year: zod_1.z.string({ required_error: 'year is required' }),
        code: zod_1.z.enum(academicSemester_constants_1.academicSemesterCodes, {
            required_error: 'code is required',
        }),
        startMonth: zod_1.z.enum(academicSemester_constants_1.academicSemesterMonths, {
            required_error: 'startMonth is required',
        }),
        endMonth: zod_1.z.enum(academicSemester_constants_1.academicSemesterMonths, {
            required_error: 'endMonth is required',
        }),
    }),
});
// ensure 1 : Route level : Update --> give me title and code both or neither
const updateAcademicSemesterZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum(academicSemester_constants_1.academicSemesterTitles, {
            required_error: 'title is required',
        })
            .optional(),
        year: zod_1.z.string({ required_error: 'year is required' }).optional(),
        code: zod_1.z
            .enum(academicSemester_constants_1.academicSemesterCodes, {
            required_error: 'code is required',
        })
            .optional(),
        startMonth: zod_1.z
            .enum(academicSemester_constants_1.academicSemesterMonths, {
            required_error: 'startMonth is required',
        })
            .optional(),
        endMonth: zod_1.z
            .enum(academicSemester_constants_1.academicSemesterMonths, {
            required_error: 'endMonth is required',
        })
            .optional(),
    }),
})
    .refine(data => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: 'Either both title and code should be provided or neither',
});
exports.AcademicSemesterValidation = {
    createAcademicSemesterZodSchema,
    updateAcademicSemesterZodSchema,
};
