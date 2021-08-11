import { Request, Response } from 'express';
import { User, UserRoles } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const signUp = async (req: Request, res: Response) => {
	const { name, email, password, role } = req.body;
	const existingUser = await User.findOne({ email: email });
	if (existingUser) {
		throw new BadRequestError('Mobile Number in use');
	}
	let hashedPassword;
	try {
		hashedPassword = await bcryptjs.hash(password, 12);
	} catch (err) {
		throw new BadRequestError('Couldnot create User, Please try again!!');
	}

	const userRole =
		UserRoles.Student === role.toLowerCase()
			? UserRoles.Student
			: UserRoles.Teacher;
	const user = User.build({
		name,
		email,
		password: hashedPassword,
		role: userRole,
		doubts: [],
	});
	await user.save();
	const userJWT = jwt.sign(
		{
			id: user.id,
			email: user.email,
		},
		process.env.JWT_KEY!
	);
	res
		.status(201)
		.send({ userId: user.id, userRole: user.role, token: userJWT });
};
export default signUp;
