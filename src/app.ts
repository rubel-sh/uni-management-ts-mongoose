import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();

// routes
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { generateStudentId } from './app/modules/user/user.utils';
import routes from './app/routes';

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1', routes);

// Testing
app.get('/', async (req, res) => {
  res.json({ message: 'hello' });
});

// Global Error Handler Middleware
app.use(globalErrorHandler);

// handle not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
    errorMessages: [{ path: req.originalUrl, message: 'API route not found' }],
  });
  next();
});

const academicSemester = {
  year: '2025',
  code: '01',
};
const testId = async () => {
  const testId = await generateStudentId(academicSemester);
  console.log(testId);
};
testId();
export default app;
