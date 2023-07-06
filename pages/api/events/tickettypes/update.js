// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import TicketModel from "../../../../models/TicketTypesModel";
import _ from "lodash";
import { connectMongo } from "../../../../utils/connectMongo";
import { ROLES, checkRoleMiddleWare } from "../../../../utils/jwtVerify";

const requestMethod = "POST";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }
    const { id, name, price } = req.body;
    if (_.isEmpty(id)) {
      throw Error("Missing Fields");
    }

    // check if role is allowed
    checkRoleMiddleWare(req, [ROLES.ADMIN]);

    await connectMongo();

    const ticketType = await TicketModel.findById(id);
    if (!ticketType) throw Error("Invalid Ticket ID");

    const data = await TicketModel.findByIdAndUpdate(id, {
      name: name ? name : ticketType.name,
      price: price === undefined ? ticketType.price : price,
    });

    return res
      .status(200)
      .json({
        status: true,
        message: "Ticket Type Updated Created",
        data: data,
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
