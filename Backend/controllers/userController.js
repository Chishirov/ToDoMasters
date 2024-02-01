import userModel from "../models/LoginSchema.js";
export const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Überprüfe, ob die Benutzer-ID vorhanden ist
    if (!userId) {
      return res.status(400).json({ message: "Benutzer-ID fehlt in der Anfrage" });
    }

    // Rufe den Benutzer aus der Datenbank ab
    const loggedUser = await userModel.findById(userId);

    // Überprüfe, ob der Benutzer gefunden wurde
    if (!loggedUser) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    // Extrahiere relevante Informationen für den Benutzer
    const userInfo = {
      _id: loggedUser._id,
      name: loggedUser.name,
      email: loggedUser.email,
    };

    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





    

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Überprüfe, ob die Benutzer-ID vorhanden ist
    if (!userId) {
      return res
        .status(400)
        .json({ message: "Benutzer-ID fehlt in der Anfrage" });
    }
    // Rufe den Benutzer aus der Datenbank ab
    const loggedUser = await userModel.findById(userId);
    // Überprüfe, ob der Benutzer gefunden wurde
    if (!loggedUser) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }
    // Extrahiere relevante Informationen für den Benutzer
    const userInfo = {
      _id: loggedUser._id,
      name: loggedUser.name,
      email: loggedUser.email,
    };
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: "Keine Benutzer gefunden" });
    }

    const usersInfo = allUsers.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
    }));




    res.json(usersInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



