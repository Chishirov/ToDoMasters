// Middleware für Authentifizierung
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/LoginSchema.js";

export const authenticateUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const loggedUser = await userModel.findOne({email: email});
        const isCorrectPassword = await bcrypt.compare(password, loggedUser.password);
        if (!loggedUser || !isCorrectPassword) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        req.user = loggedUser; // Store the authenticated user in the request object
        next(); // Proceed to the next middleware
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Middleware für Token-Erstellung
export const generateToken = (req, res, next) => {
    const expiresInMs = 5 * 60 * 1000; // Token Gültigkeit (5 minutes in milliseconds) 
    const loggedUser = req.user 
    try {
        const token = jwt.sign(
            { userId: loggedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: expiresInMs / 1000 } // expiresIn expects seconds
        );

        req.token = token; // Speichern des Tokens im Request-Objekt
        req.expiresInMs = expiresInMs; // Speichern der Gültigkeitsdauer
        console.log("Token:", token);
        next();
    } catch (error) {
        res.status(500).json({ success: false, error: 'Token generation failed' });
    }
};

// Middleware für Cookie-Setzung
export const setCookie = (req, res, next) => {
    const loggedUser = req.user 
    const token = req.token;
    const expiresInMs = 5 * 60 * 1000; // Token Gültigkeit (5 minutes in milliseconds)
    const expiresInDate = new Date( Date.now() + expiresInMs ); 

    const cookieOptions = {
        httpOnly: true,
        maxAge: expiresInMs,
    };

    const options = {
        maxAge: expiresInMs,
    };
    // Inhalt des Cookies zum Info
    const payload = {
        expires: expiresInDate.toISOString(),
        email: loggedUser.email,
    };
    res.cookie("jwt", token, cookieOptions);
    res.cookie("JWTinfo", payload, options);
    res.send({success: true, msg: `User ${loggedUser.email} logged in`})
    next();
};

// Generate JWT token on successful login
// Sign and send a JWT token upon successful login.
export const authorizeToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log("Token:", token);
  
    if (!token) {
      return res.status(401).json("Token not found")
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Token verification failed" });
      }
     
     req.user = user
      res.status(201).send(user);
    //   next();
    });
  };

//   export const getUserInfo = (req, res) => {

//     const loggedUser = userModel.findById(req.userId);

//     res.send("Dies wären eigentlich zugangsbeschränkte Infos des Users")

// }

