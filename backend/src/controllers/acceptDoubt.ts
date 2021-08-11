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
	const doubtFound = await Doubt.find({ _id: id, status: DoubtStatus.Created })
		.populate('comments')
		.populate({
			path: 'comments',
			populate: {
				path: 'user',
				select: 'name',
			},
		})
		.populate('student', 'name');
	if (doubtFound == null || doubtFound.length === 0) {
		throw new BadRequestError('Doubt has been accepted by another user');
	}
	const doubt = doubtFound[0];
	doubt.status = DoubtStatus.Accepted;
	doubt.acceptedDate = new Date();
	doubt.teacher = req.currentUser.id;

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction;
		await doubt.save({ session: sess });
		userExists.doubts?.push(doubt.id);
		await userExists.save({ session: sess });
		await sess.commitTransaction;
	} catch (err) {
		throw new BadRequestError('Request could not be completed!!');
	}
	res.status(201).send(doubt);
};
export default acceptDoubt;
