import { Request, Response } from 'express';
import { Doubt, DoubtStatus } from '../models/doubt';
import { User } from '../models/user';
import { NotAuthorizedError } from '../errors/not-auhtorized-error';
import { BadRequestError } from '../errors/bad-request-error';
import mongoose from 'mongoose';

const acceptDoubt = async (req: Request, res: Response) => {
	const userExists = await User.findById(req.currentUser?.id);
	if (userExists == null || req.currentUser == null) {
		throw new NotAuthorizedError();
	}
	let id = req.params.doubtId;
	const doubt = await Doubt.findById(id)
		.populate('comments')
		.populate({
			path: 'comments',
			populate: {
				path: 'user',
				select: 'name',
			},
		})
		.populate('student', 'name');
	if (doubt == null) {
		throw new BadRequestError('Doubt not found!!');
	}
	doubt.status = DoubtStatus.Accepted;
	doubt.acceptedDate = new Date();
	doubt.teacher = req.currentUser.id;

	const sess = await mongoose.startSession();
	sess.startTransaction;
	await doubt.save({ session: sess });
	userExists.doubts?.push(doubt.id);
	await userExists.save({ session: sess });
	await sess.commitTransaction;

	res.status(201).send(doubt);
};
export default acceptDoubt;
