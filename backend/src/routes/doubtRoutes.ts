import express from 'express';
import { body } from 'express-validator';
import { ValidateRequest } from '../middlewares/validate-request';
import checkAuth from '../middlewares/check-auth';
import {
	getCreatedDoubts,
	getDoubtById,
	getDoubts,
} from '../controllers/getDoubts';
import { getReports, getReportById } from '../controllers/getReport';
import addDoubt from '../controllers/addDoubt';
import addComment from '../controllers/addComment';
import signUp from '../controllers/signUp';
import logIn from '../controllers/login';
import { requireAuth } from '../middlewares/require-auth';
import answerDoubt from '../controllers/answerDoubt';
import escalateDoubt from '../controllers/escalateDoubt';
import acceptDoubt from '../controllers/acceptDoubt';

const router = express.Router();

router.get('/api/doubts/created', getCreatedDoubts);
router.get('/api/doubts/:doubtId', getDoubtById);
router.get('/api/doubts', getDoubts);
router.get('/api/report', getReports);
router.get('/api/report/:teacherId', getReportById);

router.post(
	'/api/users/signup',
	[
		body('name').notEmpty().withMessage('Please provide Client Name'),
		body('email').trim().isEmail().withMessage('Please enter valid email'),
		body('password')
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage('Password Length should be between 4 and 20 characters'),
		body('password').notEmpty().withMessage('Please provide Client Address'),
	],
	ValidateRequest,
	signUp
);
router.post(
	'/api/users/login',
	[
		body('email').trim().isEmail().withMessage('Please enter valid email'),
		body('password')
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage('Password Length should be between 4 and 20 characters'),
	],
	ValidateRequest,
	logIn
);
router.post(
	'/api/doubts',
	requireAuth,
	[
		body('title').notEmpty().withMessage('You must provide Title'),
		body('description').notEmpty().withMessage('You must provide Description'),
	],
	ValidateRequest,
	addDoubt
);
router.post(
	'/api/comments',
	requireAuth,
	[
		body('message').notEmpty().withMessage('You must provide Message'),
		body('doubtId').notEmpty().withMessage('You must provide Doubt Id'),
	],
	ValidateRequest,
	addComment
);

router.patch(
	'/api/doubts/answer/:doubtId',
	requireAuth,
	[body('answer').notEmpty().withMessage('You must provide Answer')],
	ValidateRequest,
	answerDoubt
);

router.patch(
	'/api/doubts/accept/:doubtId',
	requireAuth,
	ValidateRequest,
	acceptDoubt
);

router.patch('/api/doubts/escalate/:doubtId', requireAuth, escalateDoubt);

export { router as doubtRouter };
