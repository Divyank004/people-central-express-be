import createError from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import HttpStatusCodes from './src/helpers/HttpStatusCodes'
import authRoutes from './src/routes/auth';

interface Error {
  status: number;
  message: string;
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle OPTIONS for CORS preflight requests
app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, X-Custom-Header, X-Auth-Header, Content-Type, Accept, Accept-Version, Authorization, Content-Disposition'
  )
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  }
  next()
})

app.get('/', async (req, res) => {
  res.json({ message: 'People Central API up and running' })
})

// Register routes
app.use('/auth', authRoutes);


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
  res.json({
    status: err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Internal Server Error',
    error: req.app.get('env') === 'dev' ? err : {}
  });
});

module.exports = app;
