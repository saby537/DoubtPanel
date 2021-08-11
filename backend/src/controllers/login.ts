import { Request, Response } from 'express';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const logIn = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const existingUser = await User.findOne({ email: email });
	if (!existingUser) {
		throw new BadRequestError('Incorrect Credentials');
	}
	let passwordMatch;
	try {
		passwordMatch = await bcryptjs.compare(password, existingUser.password);
	} catch (err) {
		throw new BadRequestError('Coulnot log in. Please try again');
	}
	if (!passwordMatch) {
		throw new BadRequestError('Incorrect Credentials');
	}
	const userJWT = jwt.sign(
		{
			id: existingUser.id,
			mobile: existingUser.email,
		},
		process.env.JWT_KEY!
	);
	res.status(201).send({
		userId: existingUser.id,
		userRole: existingUser.role,
		token: userJWT,
	});
};
export default logIn;
