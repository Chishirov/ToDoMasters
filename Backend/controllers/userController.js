import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/LoginSchema.js";

//Implement user registration endpoint
// Create a route for user registration, saving user details to the database.

export const postRegister = async (req, res) => {
  //
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

// Implement login endpoint
// Create a login route, check user existence, and validate password using bcrypt.

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

      res.json({
        token: token,
        message: "Erfolgreich eingeloggt",
        user: user,
      });
    } else {
      res.status(401).send("Passwort oder E-Mail nicht korrekt");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Generate JWT token on successful login
// Sign and send a JWT token upon successful login.
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
    // res.send(user);

    req.user = user;
    next();
  });
};

export const postItem = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newItemData = req.body; // Assuming your request body contains the data for the new item

    const newItem = {
      title: newItemData.title,
      name: newItemData.name,
      isSelected: newItemData.isSelected,
    };

    user.items.push(newItem);
    await user.save();

    res.status(201).json({ message: "Item added successfully", newItem });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
///// vorchlag :todo:update new password
