// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import TicketModel from "../../../../models/TicketTypesModel";
import EventModel from "../../../../models/Eventmodel";
import _ from "lodash";
import { connectMongo } from "../../../../utils/connectMongo";
import { ROLES, checkRoleMiddleWare } from "../../../../utils/jwtVerify";

const requestMethod = "POST";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }
    const { name, price, eventId } = req.body;
    if (_.isEmpty(name) || _.isEmpty(price) || _.isEmpty(eventId)) {
      throw Error("Missing Fields");
    }

    // check if role is allowed
    checkRoleMiddleWare(req, [ROLES.ADMIN]);

    await connectMongo();

    const data = await TicketModel.create({
      name,
      price: JSON.parse(price),
      event: eventId,
    });

    await EventModel.findByIdAndUpdate(eventId, {
      $push: { ticketTypes: data._id },
    });

    return res
      .status(200)
      .json({ status: true, message: "Ticket type Created", data: data });
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
