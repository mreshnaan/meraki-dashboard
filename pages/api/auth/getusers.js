// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import UserModel from "../../../models/UserModel";
import _ from "lodash";
import { connectMongo } from "../../../utils/connectMongo";
import { ROLES, checkRoleMiddleWare } from "../../../utils/jwtVerify";

const requestMethod = "GET";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }
   
    checkRoleMiddleWare(req, [ROLES.ADMIN]);

    await connectMongo();
 
    const users = await UserModel.find({});

    return res
      .status(200)
      .json({ status: true, message: "All Users", data: users });
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
