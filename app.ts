import createError from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import HttpStatusCodes from './src/helpers/httpStatusCodes'
import authRoutes from './src/routes/auth';
import logger from './src/middlewares/logger';
import pinoHTTP from 'pino-http';
import userRoutes from './src/routes/users';
import vacationsRoutes from './src/routes/vacations';

interface Error {
  status: number;
  message: string;
}

const app = express();

app.use(
  pinoHTTP({
    logger,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle OPTIONS for CORS preflight requests
app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.status(HttpStatusCodes.OK).end();
  }
  next()
})

app.get('/api', async (req, res) => {
  res.json({ message: 'People Central API up and running' })
})

// Register routes
app.use('/auth', authRoutes);
app.use('/', userRoutes);
app.use('/', vacationsRoutes);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(HttpStatusCodes.NOT_FOUND));
});

// error handler
app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR);
  res.end()
});

module.exports = app;
