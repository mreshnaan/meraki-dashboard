// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import TicketModel from "../../../../models/TicketModel"
import _ from "lodash"
import { connectMongo } from "../../../../utils/connectMongo"
import { ROLES, checkRoleMiddleWare } from "../../../../utils/jwtVerify"

const requestMethod = "POST";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }
    const { id } = req.query;
    const { seller, event, ticketType } = req.body;
    if (_.isEmpty(id)) {
      throw Error("Missing Fields");
    }

    //check if role is allowed
    const decoded = checkRoleMiddleWare(req, [ROLES.ADMIN]);

    await connectMongo();

    const ticket = await TicketModel.findById(id);
    if (!ticket) throw new Error("Ticket not Found");

    await TicketModel.findByIdAndUpdate(id, {
      seller: seller ? seller : ticket.seller,
      event: event ? event : ticket.event,
      ticketType: ticketType ? ticketType : ticketType.ticketType,
      logs: ticket.logs.push(`Ticket Details updated by ${decoded.fullName}`),
    });

    return res.status(200).json({ status: true, message: "Ticket Updated" });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      status: false,
      message: "Internal Server Error",
      data: { error: error.message, body: process.env.ENVIROMENT == "dev" ? req.body : {} },
    });
  }
};
