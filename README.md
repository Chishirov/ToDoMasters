# ToDoMasters

## Team:

- Elaheh
- Omar
- Dimitar
- Jonathan



**npm package**
- npm init -y
- npm install express mongoose dotenv 
- npm install bcryptjs jsonwebtoken 
- npm npm install express-validator
- npm install cookie-parser


 ToDoMasters ist eine Anwendung, die es Benutzern ermöglicht, ihre Aufgaben und Projekte auf eine organisierte Weise zu verwalten, inspiriert von der beliebten Projektmanagement-Plattform Trello.

Live-demo
https://todomaster-frotend.onrender.com

Installation
Stellen Sie sicher, dass Sie Node.js und npm installiert haben, bevor Sie fortfahren.

1- Klone das Repository oder füge den Code zu deinem Projekt hinzu. 2- Installiere die erforderlichen npm-Pakete, indem du Folgendes ausführst:

npm init -y
npm install express mongoose dotenv 
npm install bcryptjs jsonwebtoken 
npm npm install express-validator
npm install cookie-parser
Funktionen
Anmeldung und Authentifizierung Die Benutzer können sich anmelden und werden dann über JSON Web Tokens (JWT) authentifiziert, um ihre Identität sicher zu verifizieren.

ToDo-Verwaltung Die Benutzer können ihre Aufgaben in verschiedenen Kategorien organisieren, darunter "Brainstorming", "ToDo", "In Bearbeitung" und "Erledigt".

ToDo erstellen Benutzer können neue Aufgaben erstellen und sie verschiedenen Abschnitten zuweisen

// Beispiel-Code für das Erstellen einer ToDo
app.post("/create-todo", authorizeUser, createTodo);
ToDo löschen Benutzer können spezifische Aufgaben löschen, um ihre Liste sauber zu halten.
// Beispiel-Code für das Löschen einer ToDo
app.delete("/delete-todo/:todoId", authorizeUser, deleteTodo);
ToDo bearbeiten Benutzer können den Inhalt und den Status ihrer Aufgaben aktualisieren.
// Beispiel-Code für das Bearbeiten einer ToDo
app.put("/edit-todo/:todoId", authorizeUser, editTodo);
Verwendung
Starten Sie den Server:

npm start
1- Navigieren Sie zu http://localhost:5173 in Ihrem Webbrowser.

2- Melden Sie sich an und beginnen Sie mit der Verwaltung Ihrer Aufgaben!

Konfiguration
Stellen Sie sicher, dass Sie die Umgebungsvariable JWT_SECRET mit einem sicheren Geheimschlüssel festlegen, um die JWT-Authentifizierung zu sichern.

export JWT_SECRET="your_secret_key"
Fehlerbehandlung
Falls ein Benutzer nicht gefunden wird, wird eine 404-Antwort mit einer entsprechenden Meldung gesendet. Bei internen Serverfehlern wird eine 500-Antwort mit der Meldung "Internal Server Error" gesendet.

Workflow-app Frontend
Die Workflow-app Frontend-Anwendung ermöglicht es Benutzern, ihre Aufgaben und Projekte auf eine organisierte Weise zu verwalten. Hier finden Sie eine Anleitung zur Einrichtung und Verwendung des Frontend-Teils der Trello-App.

Installation
Stellen Sie sicher, dass Sie Node.js und npm installiert haben, bevor Sie fortfahren.

1- Klone das Repository oder füge den Code zu deinem Projekt hinzu. 2- Installiere die erforderlichen npm-Pakete, indem du Folgendes ausführst:

npm install react 
npm create vite@latest
npm i axios js-cookie
npm i react-cookie
npm i cors dotenv
npm run dev
npm run start
Funktionen
Anmeldung und Authentifizierung Die Benutzer können sich anmelden und werden dann über JSON Web Tokens (JWT) authentifiziert, um ihre Identität sicher zu verifizieren.

ToDo-Verwaltung Die Benutzer können ihre Aufgaben in verschiedenen Kategorien organisieren, darunter "Brainstorming", "ToDo", "In Bearbeitung" und "Erledigt".

ToDo erstellen Benutzer können neue Aufgaben erstellen und sie verschiedenen Abschnitten zuweisen.

// Beispiel-Code für das Erstellen einer ToDo
const createTodo = async () => {
  // Implementiere die Logik zum Erstellen einer ToDo
};
ToDo löschen Benutzer können spezifische Aufgaben löschen, um ihre Liste sauber zu halten.
// Beispiel-Code für das Löschen einer ToDo
const deleteTodo = async (todoId) => {
  // Implementiere die Logik zum Löschen einer ToDo mit der gegebenen ID
};
ToDo bearbeiten Benutzer können den Inhalt und den Status ihrer Aufgaben aktualisieren.
// Beispiel-Code für das Bearbeiten einer ToDo
const editTodo = async (todoId, updatedTodo) => {
  // Implementiere die Logik zum Bearbeiten einer ToDo mit der gegebenen ID und den aktualisierten Informationen
};
Verwendung
Starte die Anwendung:

npm start
1- Navigiere zu http://localhost:3005 in deinem Webbrowser.

2- Melde dich an und beginne mit der Verwaltung deiner Aufgaben!

Konfiguration
Stelle sicher, dass du die Umgebungsvariable für die API-URL richtig konfigurierst, um die Verbindung zum Backend herzustellen.

REACT_APP_API_URL="http://localhost:3005"
Fehlerbehandlung
Bei Netzwerkfehlern oder unerwarteten Antworten von der API wird eine entsprechende Fehlermeldung angezeigt.
