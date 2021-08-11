import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

interface UserPayload {
	id: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
	if (req.method === 'OPTIONS') {
		return next();
	}
	try {
		if (!req.headers.authorization) {
			return next();
		} else {
			const token = req.headers.authorization?.split(' ')[1];
			const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
			req.currentUser = payload;
		}
		next();
	} catch (err) {
		console.log(err);
		throw new BadRequestError('Authorisation Failed!!');
	}
};

export default checkAuth;
