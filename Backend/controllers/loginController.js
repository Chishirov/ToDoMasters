import User from "../models/LoginSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send("User nicht existiert");
    }

    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 86400000,
      });

      res.send({
        message: "Erfolgreich Eingellogt",
        name: user.name,
        token: token,
      });
    } else {
      res.status(401).send("Passwort oder E-Mail nicht korrekt");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in loginController");
  }
};
