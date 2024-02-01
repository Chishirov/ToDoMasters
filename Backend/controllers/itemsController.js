import userModel from "../models/LoginSchema.js";
export const postItem = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newItem = {
      title: req.body.title,
      category: req.body.category,
    };

    user.items.push(newItem);
    await user.save();

    res.status(201).json({ message: "Item added successfully", newItem });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
