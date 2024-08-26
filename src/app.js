import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/coreRoutes/coreAuth.js';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: true,
		credentials: true,
	})
);
app.use(helmet());
app.use(morgan('dev'));

app.use('/api', authRouter);

export default app;
