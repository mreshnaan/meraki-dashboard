// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import EventModel from "../../../models/Eventmodel"
import _ from "lodash"
import { connectMongo } from "../../../utils/connectMongo"
import { ROLES, checkRoleMiddleWare } from "../../../utils/jwtVerify"

const requestMethod = "POST";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }
    const { id, name, imageUrl, eventDate, venue } = req.body;
    if (_.isEmpty(id)) {
      throw Error("Missing Fields");
    }
    
    // check if role is allowed
    checkRoleMiddleWare(req, [ROLES.ADMIN]);

    await connectMongo();

    const event = await EventModel.findById(id);
    if (!event) throw new Error("Event not Found");

    const data = await EventModel.findByIdAndUpdate(
      id,
      {
        name: name ? name : event.name,
        imageUrl: imageUrl ? imageUrl : event.imageUrl,
        eventDate: eventDate ? eventDate : event.eventDate,
        venue: venue ? venue : event.venue
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ status: true, message: "Event Updated", data: data });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      status: false,
      message: "Internal Server Error",
      data: { error: error.message, body: process.env.ENVIROMENT == 'dev' ? req.body : {} },
    });
  }
};
