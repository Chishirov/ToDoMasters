import userModel from "../models/LoginSchema.js";
import bcrypt from "bcrypt";
export const postUpdatePwdController = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  try {
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email not found" });
    }

    // Check if the current password is correct
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is invalid" });
    }
    // Hash the new password
    const saltRounds = 10;
    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
    // Update the user's password
    user.password = newHashedPassword;
    await user.save();
    // res.status(200).json(user);
    res.status(200).json({ message: "Password updated successfully" });
    console.log(user);
  } catch (error) {
    console.error("Error updating password:", error);
    // Log the specific error message for better debugging
    res.status(500).json({ Error: error.message });
  }
};
