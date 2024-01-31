import User from "../models/LoginSchema.js";

export const updateTodo = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    const todoToUpdate = user.todos.id(req.params.todoId);
    if (!todoToUpdate) {
      return res.status(404).json({ message: "Todo nicht gefunden" });
    }

    // Update the todo properties based on your requirements
    todoToUpdate.brainstorm = req.body.brainstorm;
    todoToUpdate.todo = req.body.todo;
    todoToUpdate.doing = req.body.doing;
    todoToUpdate.done = req.body.done;

    await user.save();

    res.status(200).json({ message: "Todo aktualisiert", todo: todoToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
