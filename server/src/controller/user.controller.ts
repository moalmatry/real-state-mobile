/* eslint-disable @typescript-eslint/ban-ts-comment */
import argon2 from 'argon2';
import { NextFunction, Request, Response } from 'express';
import catchAsync from 'express-async-handler';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { uploadSingleImage } from '../middleware/uploadImage';
import User from '../models/UserModel';
import { updateOne } from '../services/factory.service';
import AppError from '../utils/AppError';
import {
  UpdateChangePasswordInput,
  UpdateLoggedUserPasswordInput,
  UpdateUserDataInput,
  UpdateUserInput,
} from '../validator/user.schema';
import { createOneHandler, deleteOneHandler, getAllHandler, getOneHandler } from './factory.controller';
import { signJwt } from '../utils/authAuth';
import { deleteUser, updateUserData } from '../services/user.service';

export const uploadUserImage = uploadSingleImage('profileImage');
export const resizeImage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file?.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 40 })
      .toFile(`uploads/users/${filename}`);

    // NOTE: to save image into db
    req.body.profileImage = filename;
  }
  next();
});

/**@description list all users
 * @route  Get /api/v1/users
 * @access private Admin
 *
 */
export const getUsersHandler = getAllHandler(User, 'User');

/**@description Get specific User by id
 * @route get /api/v1/users/:id
 * @access private Admin
 */
export const getUserHandler = getOneHandler(User);
/**@description create User
 * @route  POST /api/v1/users
 * @access private Admin
 *
 */
export const createUserHandler = createOneHandler(User);

/**@description update user
 * @route  Patch /api/v1/users/:id
 * @access private Admin
 *
 */
export const updateUserHandler = catchAsync(
  async (req: Request<UpdateUserInput['params'], object, UpdateUserInput['body']>, res, next) => {
    const { id } = req.params;
    const { email, name, profileImage, role, slug, phone } = req.body;
    const document = await updateOne(User, { email, name, profileImage, role, slug, phone }, id);

    if (!document) {
      return next(new AppError('No document found for this id', 404));
    }

    res.status(200).json({ status: 'success', data: document });
  },
);

export const changeUserPasswordHandler = catchAsync(
  async (req: Request<UpdateChangePasswordInput['params'], object, UpdateChangePasswordInput['body']>, res, next) => {
    const { id } = req.params;
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password);
    const document = await updateOne(User, { password: hashedPassword, passwordChangedAt: Date.now() }, id);

    if (!document) {
      return next(new AppError('No document found for this id', 404));
    }

    res.status(200).json({ status: 'success', data: document });
  },
);

/**@description Delete Brand
 * @route  Delete /api/v1/users/:id
 * @access private Admin
 */
export const deleteUserHandler = deleteOneHandler(User);

/**@description Get Logged User
 * @route  Get /api/v1/users/get-me
 * @access private User
 */
export const getLoggedUserDataHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.params.id = req.user?._id;
  next();
});

/**@description Update Logged User Password
 * @route  Patch /api/v1/users/change-my-password
 * @access private User
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateLoggedUserPasswordHandler = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request<object, object, UpdateLoggedUserPasswordInput>, res: Response, next: NextFunction) => {
    // @ts-ignore
    const { id } = req.user;
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password);
    const user = await updateOne(User, { password: hashedPassword, passwordChangedAt: Date.now() }, id);

    // Generate new token
    const token = signJwt(user?.id);

    res.status(200).json({
      status: 'success',
      data: user,
      token,
    });
  },
);

/**@description Update Logged User Data (can't update role)
 * @route  Patch /api/v1/users/update-me
 * @access private User
 */

export const updateLoggedUserDataHandler = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request<object, object, UpdateUserDataInput>, res: Response, next: NextFunction) => {
    // @ts-ignore
    const { _id } = req.user;
    const { name, email, phone, slug } = req.body;
    const user = await updateUserData(_id, { name, email, phone, slug });

    res.status(200).json({
      status: 'success',
      data: user,
    });
  },
);

/**@description deactivate Logged User Data
 * @route  Patch /api/v1/users/delete-me
 * @access private User
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deactivateLoggedUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { _id } = req.user;
  await deleteUser(_id);

  res.status(204).json();
});