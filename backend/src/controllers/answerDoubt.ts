import { Request, Response } from 'express';
import { Doubt, DoubtStatus } from '../models/doubt';
import { User } from '../models/user';
import { NotAuthorizedError } from '../errors/not-auhtorized-error';
import { BadRequestError } from '../errors/bad-request-error';

const answerDoubt = async (req: Request, res: Response) => {
	const userExists = await User.findById(req.currentUser?.id);
	if (userExists == null || req.currentUser == null) {
		throw new NotAuthorizedError();
	}
	let id = req.params.doubtId;
	let { answer } = req.body;
	const doubt = await Doubt.findById(id);
	if (doubt == null) {
		throw new BadRequestError('Doubt not found!!');
	}
	doubt.answer = answer;
	doubt.status = DoubtStatus.Resolved;
	doubt.resolvedDate = new Date();
	await doubt.save();
	res.status(201).send(doubt);
};
export default answerDoubt;
