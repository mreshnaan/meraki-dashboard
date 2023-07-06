// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import TicketModel from "../../../models/TicketModel"
import Eventmodel from "../../../models/Eventmodel"
import TicketTypesModel from "../../../models/TicketTypesModel"
import UserModel from "../../../models/UserModel"
import _ from "lodash"
import { connectMongo } from "../../../utils/connectMongo"

const requestMethod = "GET";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }

    // const decoded = checkRoleMiddleWare(req, [ROLES.ADMIN, ROLES.CREW, ROLES.TICKETING]);

    await connectMongo();

    const tickets = await TicketModel.find()
      .populate({
        path: "ticketType",
        model: TicketTypesModel,
      })
      .populate({
        path: "event",
        model: Eventmodel,
      })
      .populate({
        path: "seller",
        model: UserModel,
        select: "-password -passwordResetToken",
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

    return res.status(200).json({
      status: true,
      message: "List of all Tickets",
      data: tickets,
    });
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
};
