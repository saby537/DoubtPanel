import { Request, Response } from 'express';
import { Doubt } from '../models/doubt';
import { Comment } from '../models/comment';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { NotAuthorizedError } from '../errors/not-auhtorized-error';
import mongoose from 'mongoose';

const addComment = async (req: Request, res: Response) => {
	const userExists = await User.findById(req.currentUser?.id);
	if (userExists == null || req.currentUser == null) {
		throw new NotAuthorizedError();
	}
	const { message, doubtId } = req.body;
	const doubt = await Doubt.findById(doubtId);
	if (doubt == null) {
		throw new BadRequestError('Doubt Not found');
	}

	const comment = Comment.build({
		message,
		user: req.currentUser.id,
		commentTime: new Date(),
	});
	const sess = await mongoose.startSession();
	sess.startTransaction;
	await comment.save({ session: sess });
	doubt.comments?.push(comment.id);
	await doubt.save({ session: sess });
	await sess.commitTransaction;

	res.status(201).send({ data: comment, user: { name: userExists.name } });
};
export default addComment;
