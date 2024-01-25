import { body } from "express-validator";
import { validationResult } from "express-validator";
import { rateLimit } from "express-rate-limit";
export const validatorUser = [
  body("password")
    .isLength({ min: 8, max: 30 })
    .withMessage("Password muss zwischen 8 und 30 Zeichen sein")
    .matches(/[a-z]/)
    .withMessage("Passwort muss einen Kleinbuchstaben enthalten")
    .matches(/[A-Z]/)
    .withMessage("Passwort muss einen Großbuchstaben enthalten")
    .matches(/\d/)
    .withMessage("Passwort muss eine Zahl enthalten"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Bitte gültige email angeben")
    .normalizeEmail(),
  body("name")
    .trim()
    .exists()
    .isLength({ min: 3, max: 30 })
    .withMessage("Bitte Namen eingeben")
    .escape(),
];

export const validateSchema = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    next();
  } else {
    res.status(400).send({ errors: validationErrors.array() });
  }
};

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "Zu viel versuche",
});
