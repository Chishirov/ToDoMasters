import User from "../models/LoginSchema.js";

export const signupController = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    res
      .status(201)
      .json({ message: "Erfolgreich registriert", newUser: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
