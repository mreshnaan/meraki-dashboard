// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from "bcrypt"
import UserModel from "../../../../models/UserModel"
import _ from "lodash"
import { connectMongo } from "../../../../utils/connectMongo"

const requestMethod = "POST";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }
    const { password, token } = req.body;
    if (_.isEmpty(password) || _.isEmpty(token)) {
      throw Error("Missing Fields");
    }

    await connectMongo();

    const user = await UserModel.findOne({ passwordResetToken: token });
    if (!user) {
      throw new Error("Invalid password reset token");
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    await UserModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      passwordResetToken: null,
    });

    return res
      .status(200)
      .json({ status: true, message: "Password reset Success" });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      status: false,
      message: "Internal Server Error",
      data: {
        error: error.message,
        body: process.env.ENVIROMENT == "dev" ? req.body : {},
      },
    });
  }
}
