import { Request, Response } from 'express';
import { User, UserRoles } from '../models/user';

const getReports = async (req: Request, res: Response) => {
	const report = await User.find({ role: UserRoles.Teacher })
		.select(['id', 'doubts', 'name'])
		.populate({
			path: 'doubts',
			select: [
				'status',
				'raisedDate',
				'acceptedDate',
				'resolvedDate',
				'escalatedDate',
			],
		});
	res.status(200).send(report);
};

const getReportById = async (req: Request, res: Response) => {
	const teacherId = req.params.teacherId;
	const report = await User.findById(teacherId).populate('doubts');
	res.status(200).send(report);
};

export { getReports, getReportById };
