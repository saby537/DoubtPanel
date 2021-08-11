import mongoose from 'mongoose';

enum UserRoles {
	Student = 'student',
	Teacher = 'teacher',
}

interface userAttrs {
	name: string;
	email: string;
	password: string;
	role: UserRoles;
	doubts: Array<mongoose.Types.ObjectId>;
}
interface userModel extends mongoose.Model<userDoc> {
	build(attrs: userAttrs): userDoc;
}
interface userDoc extends mongoose.Document {
	name: string;
	email: string;
	password: string;
	role: UserRoles;
	doubts: Array<mongoose.Types.ObjectId>;
}
const userSchema: mongoose.Schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
			enum: Object.values(UserRoles),
			default: UserRoles.Student,
		},
		doubts: [
			{
				type: mongoose.Types.ObjectId,
				required: true,
				ref: 'Doubt',
			},
		],
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				delete ret.password;
			},
		},
	}
);
userSchema.statics.build = (attrs: userAttrs) => {
	return new User(attrs);
};
const User = mongoose.model<userDoc, userModel>('User', userSchema);

export { User, UserRoles };
