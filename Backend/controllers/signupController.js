import userModel from "../models/LoginSchema.js";
import bcrypt from "bcrypt";
export const postSignupController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const saltedHashedPassword = await bcrypt.hash(password, 14);
    const newUser = await new userModel({
      name,
      email,
      password: saltedHashedPassword,
    });
    await newUser.save();
    res.status(201).send({ success: true, insertedData: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
};
