import { SignupProps } from 'index';
import User from '../models/UserModel';
export const signup = async (signupData: SignupProps) =>
  await User.create({
    ...signupData,
  });

export const findUser = async (email: string) => await User.findOne({ email });
export const findUserById = async (id: string) => await User.findOne({ _id: id });
export const findUserByResetCode = async (hashedCode: string) =>
  await User.findOne({
    passwordResetCode: hashedCode,
    passwordResetExpires: { $gt: Date.now() },
  });
