import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/LoginSchema.js";

export const postRegister = async (req, res) => {
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

export const loginCheck = async (req, res) => {
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

      res.send("Erfolgreich eingeloggt");
    } else {
      res.status(401).send("Passwort oder E-Mail nicht korrekt");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const authorizeToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json("Kein Token");
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Token verification failed" });
    }
    res.send(user)

    //req.user = user;
    //next();
  });
};

