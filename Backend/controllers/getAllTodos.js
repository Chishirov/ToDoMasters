import User from "../models/LoginSchema.js";

export const getAllTodos = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    res.status(200).json({ todos: user.todos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
