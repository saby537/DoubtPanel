import express from 'express';
import 'express-async-errors';
import path from 'path';
import { json } from 'body-parser';
import { doubtRouter } from './routes/doubtRoutes';
import { HTTPS } from 'express-sslify';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import checkAuth from './middlewares/check-auth';

const app = express();
app.set('trust proxy', true);
app.use(json());
//app.use(HTTPS({ trustProtoHeader: true }));
app.use((req, res, next) => {
	console.log('Request Received', req.originalUrl, req.method);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin,X-Requested-With,Content-Type,Accept,Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
	next();
});
app.get('/service-worker.js', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'src', 'service-worker.js'));
});
app.use(checkAuth);
app.use(doubtRouter);
app.all('*', async () => {
	throw new NotFoundError();
});
app.use(errorHandler);

export { app };
