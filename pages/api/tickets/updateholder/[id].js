// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import TicketModel from "../../../../models/TicketModel"
import Usermodel from "../../../../models/UserModel"
import _ from "lodash"
import { connectMongo } from "../../../../utils/connectMongo"
import { ROLES } from "../../../../utils/jwtVerify"

const requestMethod = "POST";

export default async function handler(req, res) {
  try {
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }
    const { id } = req.query;
    const { fullName, email, mobile } = req.body;
    if (_.isEmpty(id) || _.isEmpty(email)) {
      throw Error("Missing Fields");
    }

    //check if role is allowed
    //checkRoleMiddleWare(req, [ROLES.ADMIN]);

    await connectMongo();

    const ticket = await TicketModel.findById(id);
    if (!ticket) throw new Error("Ticket not Found");

    let user = await Usermodel.findOne({ email: email });

    if (!user) {
      user = await Usermodel.create({
        fullName: fullName,
        email: email,
        mobile: mobile,
        role: ROLES.GUEST,
      });
    }

    const data = await TicketModel.findByIdAndUpdate(id, {
      ticketHolder: user._id,
      logs: ticket.logs.push(`Ticket Holder Information Added`),
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
