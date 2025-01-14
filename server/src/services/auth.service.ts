import { SignupProps } from 'index';
import User from '../models/UserModel';
export const signup = async (signupData: SignupProps) => {
  const user = await User.create({
    ...signupData,
  });
  await user.save();
  return user;
};

export const findUser = async (email: string) => await User.findOne({ email });
export const findUserById = async (id: string) => await User.findOne({ _id: id });
export const findUserByResetCode = async (hashedCode: string) =>
  await User.findOne({
    passwordResetCode: hashedCode,
    passwordResetExpires: { $gt: Date.now() },
  });
