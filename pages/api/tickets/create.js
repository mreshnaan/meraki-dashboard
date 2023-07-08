// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { v4 } from "uuid";

import TicketModel from "../../../models/TicketModel";
import _ from "lodash";
import { connectMongo } from "../../../utils/connectMongo";
import { ROLES, checkRoleMiddleWare } from "../../../utils/jwtVerify";
import crypto from "crypto";

const requestMethod = "POST";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }
    const { seller, event, ticketType, comment, qty } = req.body;
    if (
      _.isEmpty(event) ||
      _.isEmpty(ticketType) ||
      _.isEmpty(comment) ||
      qty == undefined
    ) {
      throw new Error("Missing Fields");
    }

    const decoded = checkRoleMiddleWare(req, [ROLES.ADMIN, ROLES.CREW]);
    console.log("decode :", decoded)
    await connectMongo();
    const ticketGroupUID = v4();
    const ticketGroupSecret = crypto.randomBytes(32).toString("hex");

    const createdTickets = [];

    for (let i = 0; i < qty; i++) {
      const userData = await TicketModel.create({
        seller: decoded._id,
        event: event,
        ticketType: ticketType,
        logs: [`Ticket Issued by ${decoded.fullName}`],
        comments: comment,
        group: ticketGroupUID,
        secret: ticketGroupSecret,
      });

      createdTickets.push(userData);
    }

    return res.status(200).json({
      status: true,
      message: "Tickets Created",
      data: createdTickets,
      link: `${process.env.NEXT_PUBLIC_DOMAIN}/purchase/tickets/${ticketGroupSecret}`,
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
