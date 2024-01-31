import { body } from "express-validator";

export const validateUser = [
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
