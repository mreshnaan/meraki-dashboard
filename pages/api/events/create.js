// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import EventModel from "../../../models/Eventmodel";
import TicketTypeModel from "../../../models/TicketTypesModel";
import _ from "lodash";
import { connectMongo } from "../../../utils/connectMongo";
import { ROLES, checkRoleMiddleWare } from "../../../utils/jwtVerify";

const requestMethod = "POST";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }
    const { name, imageUrl, eventDate, venue } = req.body;
    if (
      _.isEmpty(name) ||
      _.isEmpty(imageUrl) ||
      _.isEmpty(eventDate) ||
      _.isEmpty(venue)
    ) {
      throw Error("Missing Fields");
    }

    // check if role is allowed
    checkRoleMiddleWare(req, [ROLES.ADMIN]);

    await connectMongo();

    const data = await EventModel.create({
      name,
      imageUrl,
      eventDate,
      venue,
    });

    const defaultTicketType = await TicketTypeModel.create({
      name: "Pass",
      price: 0,
      event: data._id,
    });
    await EventModel.findByIdAndUpdate(data._id, {
      $push: { ticketTypes: defaultTicketType },
    });

    return res
      .status(200)
      .json({ status: true, message: "Event Created", data: data });
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
