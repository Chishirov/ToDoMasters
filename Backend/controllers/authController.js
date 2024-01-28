import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import "dotenv/config";
import userModel from '../models/userModel.js';

export const postSignupController = async (req, res) => { 

    // Die Eingaben sollten vorher mit express-validator überprüft
    const {email, password } = req.body;

    try {

        const saltedHashedPassword = await bcrypt.hash(password, 14);
        const newUser = new userModel({
            email, password: saltedHashedPassword
        });
        await newUser.save();
        res.status(201).send({success:true, insertedData: newUser});
        // in Production würde ich nicht komplett newUser an CLient
        // schicken, weil das gehashte Passwört unnötig übertragen wird
        // (Bei jeder Übertragung von sicherheitrelevanten Daten kann
        // potenziell etwas passieren, z.B. von Angreifer abgefangen)
        // Aber: Durch https wird es verschlüsselt übertragen
        // Man könnte es so machen: insertedData: {...newUser, password:null}}
        
    } catch (error) {
        // wir könnten das error Object überprüfen und je nachdem
        // welcher Fehler konkret aufgetaucht ist,
        // einen anderen Status senden (z.B. 422 bei Validierungsfehler)
        console.error(error)
        res.status(500).send({success: false, error: error.message})
        // 500 => interner server error
    }

    // Man könnte (oder gar sollte) den User hier auch schon "einloggen",
    // also das entsprechende JWT Token senden, so wie es in dem nachfolgenden
    // Controller postLoginController gemacht wird.
    // Dazu sollte man aber das erstellen des Tokens auslagern (siehe 3_verbesserung)
}


// Bei dem Nachfolgendem handelt es sich um einen Kommentar
// nach dem jsdoc schema. Vorteil hier: Wir bekommen autocomplete
// für req und res
/**
 * Handles the login post request.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const postLoginController = async (req, res) => { 
    // Die Eingaben sollten vorher mit express-validator überprüft

    const { email, password } = req.body;

    // 1. Authentificate User

    try {
        const loggedUser = await userModel.findOne({email: email});
        if(!loggedUser) {
            return res.status(404).send({success: false, error: 'User/Password Combination not found'});
        }
        // debugger;
        const isCorrectPassword = await bcrypt.compare(password, loggedUser.password);
        if(!isCorrectPassword) {
            return res.status(404).send({success: false, error: 'User/Password Combination not found'})
        } 

        // debugger;
        
        // 2. JWT  erstellen und an den Client senden

        // Info: Nachfolgendes könnte man in eine eigene Middleware 
        // auslagern und entspechend hier folgendes ausführen:
        // req.user = user; next()
        // Alternativ könnte man es in eine separate Funktion packen

        // 5 Minuten in Millisekunden (so kurz zum Testen, sonst z.B. ganzer Tag)
        const expiresInMs = 5 * 60 * 1000; 

        // Datum und Uhrzeit, wann es abläuft
        const expiresInDate = new Date( Date.now() + expiresInMs ); 

        // next();

        const token = jwt.sign(
            {userId: loggedUser._id},
            process.env.JWT_SECRET,
            {expiresIn: expiresInMs/1000} // Wann läuft das Token ab? Erwartet Sekunden, daher geteilt durch 1000
        );

        // jwt Cookie zum Response hinzufügen
        const cookieOptions = {
            // Client kann cookie NICHT mittels JavaScript auslesen (document.cookie)
            httpOnly: true, 

             // Cookie wird automatisch zur gleichen Zeit gelöscht, wenn unser JWT abläuft
             // denn: Wenn das Token ungültig ist, brauchen wir das Cookie auch nicht mehr
             maxAge: expiresInMs
        }
        

        res.cookie('jwt', token, cookieOptions);
        // Füge cookie zum header des Response hinzu
        // debugger;


        // JWTinfo Cookie
        // ... ist eine Art "Hilfscookie" für das Frontend
        // - denn aus Sicherheitsgründen, ist unser jwt cookie "httpOnly"
        // - das heißt, im Frontend können wir es nicht auslesen, ändern und löschen
        // - Wir können nicht einmal im Frontend-Code schauen, ob es existiert
        // `document.cookie` würde uns nur cookies anzeigen, die NICHT httpOnly
        // sind 

        // JWTinfo Cookie speichert daher vor allem die Information,
        // wer eingeloggt ist, damit man es dann im Frontend bequem auslesen kann
        // zusätzlich beinhaltet es noch die Information, wann das JWT abläuft (expired)

        // aus Sicherheitsgründen könnte man diesem Cookie einen generischen Namen
        // geben, wie z.B. info
        const options = {
            maxAge: expiresInMs
        };
        const payload = {
            expires: expiresInDate.toISOString(), // Info, wann (Datum) läuft JWT ab
            email: loggedUser.email // Info, welcher User is eingeloggt (wir könnten auch ID benutzen, wäre sogar etwas besser)
        }
        res.cookie('JWTinfo', payload, options);

        // debugger;
        return res.send({success: true, msg: `User ${loggedUser.email} logged in`})
     
        
    } catch (error) {
        console.error(error)
        res.status(500).send({success:false, error: error.message})
    }

}



/**
 * Handles the logout post request.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const postLogoutController = async (req, res) => {
    res.clearCookie("jwt");
    res.clearCookie("JWTinfo");
    res.send({msg: "erfolgreich ausgeloggt"});
}




// cookieOptions in besser
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
  };

  // Mehr hierzu: Siehe cookies.md