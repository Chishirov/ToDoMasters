import userModel from "../models/LoginSchema.js";
export const getUserInfo = async (req, res) => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token not provided" });
    }

    const loggedUser = await userModel.findById(req.userId);

    if (!loggedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userInfo = {
      _id: loggedUser._id,
      name: loggedUser.name,
      email: loggedUser.email,
    };

    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
