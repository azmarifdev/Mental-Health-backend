import { StatusCodes } from 'http-status-codes';
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import routes from './app/routes';
import cookieParser from 'cookie-parser';
import config from './config';

const app: Application = express();

const defaultOrigins = [
   'http://localhost:3000',
   'http://localhost:3001',
   'http://localhost:5173',
];

const allowedOrigins = (
   config.frontend_url
      ? config.frontend_url.split(',').map(origin => origin.trim())
      : defaultOrigins
).filter(Boolean);

// cors
app.use(
   cors({
      origin: (origin, callback) => {
         // Allow non-browser/server-to-server requests.
         if (!origin) {
            return callback(null, true);
         }

         if (allowedOrigins.includes(origin)) {
            return callback(null, true);
         }

         return callback(new Error(`CORS blocked for origin: ${origin}`));
      },
      credentials: true,
   })
);
// cockie perser
app.use(cookieParser());

// body perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes
app.use('/api/v1', routes);

// globalErrorHandler
app.use(globalErrorHandler);

app.get('/', (req, res) => {
   res.send(`Server is running at 5000 port`);
});

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
   res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Not Found',
      errorMessages: [
         {
            path: req.originalUrl,
            message: 'API Not Found',
         },
      ],
   });
   next();
});

export default app;
