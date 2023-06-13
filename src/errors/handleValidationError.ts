import mongoose from 'mongoose'
import { IGenericErrorResponse } from '../interfaces/common'
import { IGenericErrorMessage } from '../interfaces/error'

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  // Return Type
  // মুখস্ত বিদ্যা ইন্টারফেস
  // এই এরর এর একটা প্যাটার্ন দরকার য়া IGenericErrorMessage
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (elem: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: elem?.path,
        message: elem?.message,
      }
    }
  )

  const statusCode = 500

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}
