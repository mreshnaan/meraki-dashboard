// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from "bcrypt";
import UserModel from "../../../models/UserModel";
import _ from "lodash";
import { connectMongo } from "../../../utils/connectMongo";
import { ROLES, checkRoleMiddleWare } from "../../../utils/jwtVerify";

const requestMethod = "POST";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }
    const { fullname, email, mobile, password, role } = req.body;
    if (
      _.isEmpty(fullname) ||
      _.isEmpty(email) ||
      _.isEmpty(password) ||
      _.isEmpty(role)
    ) {
      throw Error("Missing Fields");
    }
   
    
    //check if role is allowed 
    if(!allowedRoles(role)) throw new Error("Role is not allowed");

    checkRoleMiddleWare(req, [ROLES.ADMIN]);

    await connectMongo();
 
    const hashedPassword = await bcrypt.hash(password, 8);
    const userData = await UserModel.create({
      email: email,
      password: hashedPassword,
      fullName: fullname,
      mobile: mobile,
      role:role
    });

    return res
      .status(200)
      .json({ status: true, message: "User Created", data: userData });
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
