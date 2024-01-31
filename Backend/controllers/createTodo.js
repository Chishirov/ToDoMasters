import User from "../models/LoginSchema.js";

export const createTodo = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    const newTodo = {
      brainstrom: req.body.brainstrom,
      todo: req.body.todo,
      doing: req.body.doing,
      done: req.body.done,
    };

    user.todos.push(newTodo);
    await user.save();

    res.status(201).json({ message: "Todo erstellt", todo: newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
