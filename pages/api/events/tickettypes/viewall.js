// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Eventmodel from "../../../../models/Eventmodel";
import TicketTypeModel from "../../../../models/TicketTypesModel";
import _ from "lodash";
import { connectMongo } from "../../../../utils/connectMongo";

const requestMethod = "GET";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }

    // check if role is allowed
    // checkRoleMiddleWare(req, [ROLES.ADMIN]);

    await connectMongo();
    const types = await TicketTypeModel.find().populate({
      path: "event",
      model: Eventmodel,
    });

    return res
      .status(200)
      .json({ status: true, message: "List of all types", data: types });
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
