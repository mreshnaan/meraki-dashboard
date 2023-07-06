// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from "bcrypt";
import UserModel from "../../../models/UserModel";
import _ from "lodash";
import jwt from 'jsonwebtoken';

import { connectMongo } from "../../../utils/connectMongo";

const requestMethod = "POST";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }
    const { email, password } = req.body;
    if (
      _.isEmpty(email) ||
      _.isEmpty(password) 
    ) {
      throw Error("Missing Fields");
    }

    await connectMongo();

    //find User
    const user = await UserModel.findOne({email:email});
    if(!user) {
      throw new Error("User Email not found");
    }

    const compare = await bcrypt.compare(password, user.password);
    if(!compare) {
      throw new Error("Incorrect Password");
    }

    const jswtToken = jwt.sign({_id:user._id, fullName:user.fullName, email:user.email, role:user.role}, process.env.JWT_SECRET, {
        expiresIn:  60 * 60 *30
    });

    return res
      .status(200)
      .json({ status: true, message: "Login Success", data: {jwt:jswtToken, profile:{email:user.email, fullName:user.fullName, role:user.role}} });
  } catch (error) {
    console.log(error);
    res
      .status(501)
      .json({
        status: false,
        message: "Internal Server Error",
        data: { error: error.message, body:process.env.ENVIROMENT == 'dev'?req.body:{} },
      });
  }
}

function allowedRoles(role) {
  switch (role) {
    case "ADMIN":
      return true;
    case "CREW":
      return true;
    case "GUEST":
      return true;
    case "TICKETING":
      return true;
    default:
      return false;
  }
}
