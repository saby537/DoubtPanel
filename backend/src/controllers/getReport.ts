import { Request, Response } from 'express';
import { User, UserRoles } from '../models/user';
import { Doubt } from '../models/doubt';
const getReports = async (req: Request, res: Response) => {
	const userReport = await User.find({ role: UserRoles.Teacher })
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
	const doubtReport = await Doubt.find({}).select([
		'id',
		'status',
		'raisedDate',
		'resolvedDate',
	]);
	res.status(200).send({ report: { userReport, doubtReport } });
};

const getReportById = async (req: Request, res: Response) => {
	const teacherId = req.params.teacherId;
	const report = await User.findById(teacherId).populate('doubts');
	res.status(200).send(report);
};

export { getReports, getReportById };
