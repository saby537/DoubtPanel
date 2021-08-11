import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-auhtorized-error';
export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.currentUser == null) {
		throw new NotAuthorizedError();
	}
	next();
};
