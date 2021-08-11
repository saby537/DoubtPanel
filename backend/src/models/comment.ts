import mongoose from 'mongoose';

interface commentAttrs {
	message: string;
	commentTime: Date;
	user: mongoose.Types.ObjectId;
}
interface CommentDoc extends mongoose.Document {
	message: string;
	commentTime: Date;
	user: mongoose.Types.ObjectId;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
	build(attrs: commentAttrs): CommentDoc;
}

const commentSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
		message: {
			type: String,
			required: true,
		},
		commentTime: {
			type: mongoose.Schema.Types.Date,
			required: true,
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
commentSchema.statics.build = (attrs: commentAttrs) => {
	return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
	'Comment',
	commentSchema
);
export { Comment, CommentDoc };
