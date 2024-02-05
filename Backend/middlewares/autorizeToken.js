import jwt from "jsonwebtoken";

export const authorizeToken = (req, res, next) => {
  // const token = req.headers["authorization"]?.split(" ")[1];
  const token = req.cookies?.token;
  console.log("Token:", token);

  if (!token) {
    console.log("Token nicht gefunden");
    return res.status(401).json("Kein Token");
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Token verification failed" });
    }
    res.send(user);
    next()
  });
};
