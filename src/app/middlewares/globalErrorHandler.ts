/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorlogger } from '../../shared/logger';

// এসব ভ্যালু এর ক্ষেত্রে টাইপ predict করা যায়না ।
const globalErrorHandler: ErrorRequestHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req,
  res,
  next
) => {
  config.env == 'development'
    ? console.log('🚀 globalErrorHandler', error)
    : errorlogger.error('🚀 globalErrorHandler errorLogger', error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  // If error coming from mongoose validation error
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  // Zod Error
  else if (error instanceof ZodError) {
    const simplifierZodError = handleZodError(error);
    statusCode = simplifierZodError.statusCode;
    message = simplifierZodError.message;
    errorMessages = simplifierZodError.errorMessages;
  }

  // api এরর
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  // If it's normal error like : api error
  else if (error instanceof Error) {
    message = error?.message;
    //  IF message is an empty string and we want to validate our Interface, also to maintain out consistency
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  //   Generic Error Pattern for frontend
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined, // depend korbe .env NODE_ENV উপর
  });

  next();
};

export default globalErrorHandler;
