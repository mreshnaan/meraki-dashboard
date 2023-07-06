// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import TicketModel from "../../../models/TicketModel"
import UserModel from "../../../models/UserModel"
import TicketTypesModel from "../../../models/TicketTypesModel"
import _ from "lodash"
import { connectMongo } from "../../../utils/connectMongo"

const requestMethod = "GET";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }

    const { secret } = req.query;
    // const decoded = checkRoleMiddleWare(req, [ROLES.ADMIN, ROLES.CREW, ROLES.TICKETING]);

    await connectMongo();

    const tickets = await TicketModel.find({ secret: secret })
      .populate({
        path: "ticketType",
        model: TicketTypesModel,
      })
      .populate({
        path: "ticketOwner",
        model: UserModel,
        select: "-password -passwordResetToken",
      })
      .populate({
        path: "ticketHolder",
        model: UserModel,
        select: "-password -passwordResetToken",
      });

    return res
      .status(200)
      .json({ status: true, message: "Tickets by Secret", data: tickets });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      status: false,
      message: "Internal Server Error",
      data: {
        error: error.message,
        body:
          process.env.ENVIROMENT == "dev" ? req.body : {},
      },
    });
  }
};

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
