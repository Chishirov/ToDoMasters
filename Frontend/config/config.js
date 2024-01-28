import 'dotenv/config'
let backendUrl;

console.log( "process.env.NODE_ENV:", process.env.NODE_ENV);

if(process.env.NODE_ENV === "production") {
    // Benutze diese URL, um mit dem Backend zu kommunizieren,
    // wenn wir auf render, also in "production", sind
    backendUrl = "https://book-app-backend-deployment-test.onrender.com";
} else {
    // Benutze diese URL, um mit dem Backend zu kommunizieren,
    // wenn wir am Projekt arbeiten, also in "development" sind
    backendUrl = "http://localhost:3005";
}

export default backendUrl;

// * process.env.NODE_ENV im Frontend? * 
/* Eigentlich ist process und somit process.env ein Object,
das nur im Backend bzw. in Nodejs existiert und NICHT im Frontend bzw. Browser.

Aber: Das process.env.NODE_ENV-Konstrukt in JavaScript, insbesondere in Projekten, 
die mit Bundlern wie Vite oder Webpack erstellt wurden, kann auch BEDINGT im Frontend-Code 
verwendet werden.

Vite setzt den Wert für process.env.NODE_ENV automatisch, je nachdem ob man 
`npm run dev` oder `npm run build` ausführt.

Mehr hierzu: siehe "info-umgebungsvariablen.md" */

// so würde man eigene Umgebungsvariablen aus .env auslesen:
console.log(import.meta.env.VITE_TEST, "(aus import.meta.env.VITE_TEST)")

// console.log(process.env.VITE_TEST)
// würde zu einem Fehler führen ("Uncaught ReferenceError: process is not defined")#
// Funktioniert in der Form also nur für `process.env.NODE_ENV` 
