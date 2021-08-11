import { Request, Response } from 'express';
import { Doubt, DoubtStatus } from '../models/doubt';

const getCreatedDoubts = async (req: Request, res: Response) => {
	const doubts = await Doubt.find({ status: DoubtStatus.Created });
	res.status(200).send(doubts);
};

const getDoubtById = async (req: Request, res: Response) => {
	const doubtId = req.params.doubtId;
	const doubt = await Doubt.findById(doubtId)
		.populate('comments')
		.populate({
			path: 'comments',
			populate: {
				path: 'user',
				select: 'name',
			},
		})
		.populate('student', 'name');

	res.status(200).send(doubt);
};

const getDoubts = async (req: Request, res: Response) => {
	const doubts = await Doubt.find({})
		.populate('comments')
		.populate({
			path: 'comments',
			populate: {
				path: 'user',
				select: 'name',
			},
		})
		.populate('student', 'name')
		.populate('teacher', 'name');
	res.status(200).send(doubts);
};

export { getCreatedDoubts, getDoubtById, getDoubts };
