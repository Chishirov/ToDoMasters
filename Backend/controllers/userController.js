import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/LoginSchema.js";

//Implement user registration endpoint
// Create a route for user registration, saving user details to the database.

export const postRegister = async (req, res) => {
    try {
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        console.log("name in postRegister",req.body.name);
        console.log("Email in postRegister",req.body.email);
        console.log("password in postRegister",req.body.password);

        await user.save();
        res.status(201).json({ message: "Erfolgreich registriert", newUser: user.name });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
};

export const loginCheck = async (req, res) => {
    // Der eingeloggte Benutzer und das Token sind jetzt im req-Objekt verfügbar von "authenticateUser + generateToken + setCookie"
    const loggedUser = req.user;

    const token = req.token;

    // Deine restliche Logik für die Anmeldung
    res.send({ success: true, msg: `User ${loggedUser.email} logged in` });
};

export const postLogoutController = async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
    };

    // Retrieve user information from the request or wherever it's stored
    const loggedUser = req.loggedUser;

    // Check if loggedUser is available
    if (!loggedUser) {
        // Handle the case where user information is not available
        return res.status(401).send({ success: false, msg: "User information not available" });
    }

    console.log(loggedUser);

    res.clearCookie("jwt", cookieOptions);
    res.clearCookie("JWTinfo", cookieOptions);
    res.send({ success: true, msg: `User ${loggedUser.email} logged out` });
};



export const updatePassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    try {
        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Email not found" });
        }
        console.log('currentPassword:', currentPassword);
        console.log('newPassword:', newPassword);
        console.log('userPassword:', user.password);

        // Check if the current password is correct
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Current password is invalid" });
        }
            // Hash the new password
        const saltRounds = 10;
        const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update the user's password
        user.password = newHashedPassword;
        await user.save();
        res.status(200).json(user);
        // res.status(200).json({ message: "Password updated successfully" });
        console.log(user);
    } catch (error) {
        console.error("Error updating password:", error);

        // Log the specific error message for better debugging
        res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
};


export const getUserInfoController = (req, res) => {

    // hier könnte man jetzt eine Abfrage zu MOngoDB machen
    // und sich z.B. weitere, persönliche Angaben des Nutzers holen

    // dafür müsste man in `req.userId`(gesetzte von isAuth) schauen
    // welcher user eingeloggt ist
    // z.B.: const loggedUser = User.findById(req.userId);

    res.send("Dies wären eigentlich zugangsbeschränkte Infos des Users")

}

