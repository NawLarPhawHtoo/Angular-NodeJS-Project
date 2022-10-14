import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import { UserCreate } from "../interfaces/user";
import bcrypt from "bcrypt";
import moment from "moment";

export const getUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: any = await User.find();
    if (!users) {
      return res.status(404).send({
        error: "User not found",
      });
    } else {
      res.json({
        message: "Users Fetched",
        data: users,
        status: 1,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const findUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await User.findById(req.params.id);
    if (!user) {
      const error: any = Error("Not Found");
      error.statusCode = 401;
    }
    res.json({
      data: user,
      status: 1,
    });
  } catch (err) {
    next(err);
  }
};

export const createUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 401;
      throw error;
    }

    let profile: string = req.body.profile;
    if (req.file) {
      profile = req.file.path.replace("\\", "/");
    }

    const userTo: UserCreate = {
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      phone: req.body.phone,
      birthday: req.body.birthday,
      gender: req.body.gender,
      address: req.body.address,
      type: req.body.type,
      skill: req.body.skill,
      experience: req.body.experience,
      profile: profile,
      created_user_id: req.body.created_user_id,
    };
    const user = new User(userTo);
    const result = await user.save();
    res.status(201).json({
      message: "Created User successfully!",
      data: result,
      status: 1,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await User.findByIdAndUpdate(req.params.id);
    if (!user) {
      const error: any = Error("Not Found");
      error.statusCode = 401;
    }

    let profile: string = req.body.profile;
    if (req.file) {
      {
        profile = req.file.path.replace("\\", "/");
      }
      if (profile) {
        user.profile = profile;
      }
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.birthday = req.body.birthday;
    user.gender = req.body.gender;
    user.address = req.body.address;
    user.type = req.body.type;
    user.skill = req.body.skill;
    user.experience = req.body.experience;
    user.profile = profile;
    user.created_user_id = req.body.created_user_id;
    user.updated_user_id = req.body.updated_user_id;

    const result = await user.save();
    res.json({
      message: "Updated user successfully!",
      data: result,
      status: 1,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      const error: any = Error("Not Found");
      error.statusCode = 401;
    }
    res.json({
      message: "User deleted successfully!",
      data: user,
      status: 1,
    });
  } catch (err) {
    next(err);
  }
};
