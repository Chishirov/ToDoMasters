import User from "../models/LoginSchema.js";

export const deleteTodo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const todoId = req.params.todoId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { todos: { _id: todoId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Benutzer oder Todo nicht gefunden" });
    }

    res.status(200).json({ message: "Todo gelöscht", todo: { _id: todoId } });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
