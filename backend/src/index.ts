import mongoose from 'mongoose';
import { app } from './app';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT Key Missing!!!');
	}

	try {
		await mongoose.connect(
			`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@akshayindia-shard-00-00.fm5jh.mongodb.net:27017,akshayindia-shard-00-01.fm5jh.mongodb.net:27017,akshayindia-shard-00-02.fm5jh.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-14oev3-shard-0&authSource=admin&retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			}
		);
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error(err);
	}
	app.listen(process.env.PORT || 5000, () => {
		console.log('Listening on Port:5000!');
	});
};

start();
