import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
enum DoubtStatus {
	Created = 'created',
	Accepted = 'accepted',
	Resolved = 'resolved',
	Escalated = 'escalated',
}

interface doubtAttrs {
	title: string;
	status: DoubtStatus;
	description: string;
	answer?: string;
	student: mongoose.Types.ObjectId;
	raisedDate: Date;
	teacher?: mongoose.Types.ObjectId;
	acceptedDate?: Date;
	escalatedDate?: Date;
	resolvedDate?: Date;
	comments?: Array<mongoose.Types.ObjectId>;
}
interface DoubtDoc extends mongoose.Document {
	title: string;
	status: DoubtStatus;
	description: string;
	answer?: string;
	student: mongoose.Types.ObjectId;
	raisedDate: Date;
	teacher?: mongoose.Types.ObjectId;
	acceptedDate?: Date;
	escalatedDate?: Date;
	resolvedDate?: Date;
	version: number;
	comments?: Array<mongoose.Types.ObjectId>;
}

interface DoubtModel extends mongoose.Model<DoubtDoc> {
	build(attrs: doubtAttrs): DoubtDoc;
}

const doubtSchema = new mongoose.Schema(
	{
		student: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
		teacher: { type: mongoose.Types.ObjectId, required: false, ref: 'User' },
		comments: [
			{ type: mongoose.Types.ObjectId, required: false, ref: 'Comment' },
		],
		title: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			enum: Object.values(DoubtStatus),
			default: DoubtStatus.Created,
		},
		description: {
			type: String,
			required: true,
		},
		answer: {
			type: String,
			required: false,
		},
		raisedDate: {
			type: mongoose.Schema.Types.Date,
			required: true,
		},
		acceptedDate: {
			type: mongoose.Schema.Types.Date,
			required: false,
		},
		escalatedDate: {
			type: mongoose.Schema.Types.Date,
			required: false,
		},
		resolvedDate: {
			type: mongoose.Schema.Types.Date,
			required: false,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			},
		},
	}
);

doubtSchema.set('versionKey', 'version');
doubtSchema.plugin(updateIfCurrentPlugin);
doubtSchema.statics.build = (attrs: doubtAttrs) => {
	return new Doubt(attrs);
};

const Doubt = mongoose.model<DoubtDoc, DoubtModel>('Doubt', doubtSchema);
export { Doubt, DoubtStatus };
