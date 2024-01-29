import mongoose from "mongoose";
import bcrypt from "bcrypt";
///name:string
//email:string,
//password:number = min 8 incluid (grosbuchtabe)=>withmessage(min 8 and grosbuchtabe)

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
  items: [
    {
      title: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      isSelected: {
        type: Boolean,
        default: false,
      },
    },
  ],
});
UserModel.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model("user", UserModel);
