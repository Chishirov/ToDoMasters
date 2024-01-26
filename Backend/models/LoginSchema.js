import mongoose from "mongoose";
import bcrypt from "bcrypt";
///name:string
//email:string,
//password:number = min 8 incluid (grosbuchtabe)=>withmessage(min 8 and grosbuchtabe)



const TodoSchema = new mongoose.Schema({
  brainstrom: { type: String, required: false},
  todo: { type: String, required: false},
  doing: { type: String, required: false},
  done: { type: String, required: false},
  });


const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [TodoSchema],
});

UserModel.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model("user", UserModel);
