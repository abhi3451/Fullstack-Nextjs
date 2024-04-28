import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: Boolean;
  isAcceptingMessage: boolean;
  messages: Message[]; //as we  want to keep messages in user also
}
const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "userName required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email required"],
    trim: true,
    unique: true,
    match: [/.\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/, "enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verify code is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models
    .User as mongoose.Model<User>) /*want user of User Schema not of genric type and we are using already db */ ||
  mongoose.model<User>("User", UserSchema); //to check if there is db already if not than create one
export default UserModel;
