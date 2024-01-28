import jwt from "jsonwebtoken";



export default (req, res, next) => {
    // Hole den JWT aus dem Cookie der Anfrage (req) und speichere ihn 
    // in der token variable, falls vorhanden. 
    // Wenn der Cookie oder JWT fehlt, wird token einfach undefined.
    // Wir verwenden hierzu den Optional Chaining (?.) Operator
    // debugger;
    const token = req.cookies?.jwt;
    // debugger;
    // kurzform für
    // const token = req.cookie && req.cookie.jwt ? req.cookie.jwt : undefined

    

    // Kein Token gefunden
    if(!token) {
        console.log("Token nicht gefunden")
        return res.status(401).send({error: "Nicht authorisiert"}); // 401 => nicht authorisiert
    }

    // Gültigkeit des Tokens überprüfen
    try {
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedPayload.userId;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).send({error: "Nicht authorisiert"});
    }

}

// Info zu jwt.verify
/*
(Asynchron) Wenn ein Callback übergeben wird, handelt die Funktion asynchron. Der Callback wird mit dem dekodierten Payload aufgerufen, wenn die Signatur gültig ist und die optionalen Angaben zu Ablauf, Zielgruppe oder Aussteller gültig sind. Wenn nicht, wird er mit einem Fehler aufgerufen.

(Synchron) Wenn kein Callback übergeben wird, arbeitet die Funktion synchron. Gibt die dekodierter Payload zurück, wenn die Signatur gültig ist und die Optionen Ablaufdatum, Zielgruppe oder Aussteller gültig sind. Wenn nicht, wird ein Fehler ausgegeben.
*/

