import { Request, Response } from 'express';
import { Doubt, DoubtStatus } from '../models/doubt';
import { User } from '../models/user';
import { NotAuthorizedError } from '../errors/not-auhtorized-error';
import mongoose from 'mongoose';
const addDoubt = async (req: Request, res: Response) => {
	const userExists = await User.findById(req.currentUser?.id);
	if (userExists == null || req.currentUser == null) {
		throw new NotAuthorizedError();
	}
	let { title, description } = req.body;
	const doubt = Doubt.build({
		title,
		description,
		student: req.currentUser?.id,
		status: DoubtStatus.Created,
		raisedDate: new Date(),
	});
	const sess = await mongoose.startSession();
	sess.startTransaction;
	await doubt.save({ session: sess });
	userExists.doubts?.push(doubt.id);
	await userExists.save({ session: sess });
	await sess.commitTransaction;

	res.status(201).send(doubt);
};
export default addDoubt;
