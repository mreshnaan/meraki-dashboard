// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from "bcrypt";
import UserModel from "../../../models/UserModel";
import _ from "lodash";
import { connectMongo } from "../../../utils/connectMongo";

const requestMethod = "POST";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }
    const { fullname, email, mobile, password } = req.body;
    console.log(fullname, email, mobile, password);
    if (_.isEmpty(fullname) || _.isEmpty(email) || _.isEmpty(password)) {
      throw Error("Missing Fields");
    }

    await connectMongo();

    const hashedPassword = await bcrypt.hash(password, 8);
    const userData = await UserModel.create({
      email: email,
      password: hashedPassword,
      fullName: fullname,
      mobile: mobile,
      role: "ADMIN",
    });

    return res
      .status(200)
      .json({ status: true, message: "User Created", data: userData });
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
