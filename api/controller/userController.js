import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "test",
  });
};

export const updateUserDetails = async (req, res, next) => {
  if (req.user.id != req.params.id)
    return next(errorHandler(401, "UnAuthorized Access"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const deleteUserDetails = async (req, res, next) => {
  if (req.user.id != req.params.id)
    return next(errorHandler(401, "UnAuthorized Access"));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json(errorHandler(200, "User Deleted Successfully"));
  } catch (Err) {
    next(Err);
    console.log(Err);
  }
};
