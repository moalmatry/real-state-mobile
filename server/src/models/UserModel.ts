import mongoose, { Schema } from 'mongoose';
import { hashArgon } from '../utils/authAuth';
import { IUser } from './types';

// 1- Create Interface

// 2- Create Schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Too short name'],
      maxlength: [50, 'Too long name'],
      lowercase: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Please enter phone number'],
      // unique: [true, 'phone number must be unique'],
      unique: false,
    },
    profileImg: String,

    password: {
      type: String,
      required: [true, 'Password required'],
      minlength: [8, 'Too short password'],
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Number,
    passwordResetVerified: Boolean,
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'EMPLOYEE'],
      default: 'USER',
    },
    active: {
      type: Boolean,
      default: true,
    },
    // child reference (one to many)
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    addresses: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        alias: String,
        details: String,
        phone: String,
        city: String,
        postalCode: String,
      },
    ],
  },
  { timestamps: true },
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Hashing user password
  this.password = (await hashArgon(this.password)) || '';
  next();
});

export default mongoose.model<IUser>('User', userSchema);
