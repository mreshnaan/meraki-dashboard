// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { v4 } from 'uuid'
import UserModel from '../../../../models/UserModel'
import _ from 'lodash'
import { connectMongo } from '../../../../utils/connectMongo'

import { sendEmail } from '../../../../utils/email'

const requestMethod = "POST";

export default async  function handler(req, res) {
  try {
    console.log("hey");
    if (req.method !== requestMethod) {
      throw new Error(`Invalid Method Type, Only ${requestMethod} Allowed`);
    }
    const { email } = req.body;
    if (_.isEmpty(email)) {
      throw Error("Missing Fields");
    }

    await connectMongo();

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid User Email");
    }

    const passwordResetToken = v4();
    await UserModel.findByIdAndUpdate(user._id, {
      passwordResetToken: passwordResetToken
    });

    await sendEmail(
      user.email,
      "RESET PASSWORD",
      "RESET PASSWORD",
      "Please click the button below to reset your password",
      "RESET PASSWORD",
      `${process.env.NEXT_PUBLIC_DOMAIN}/account/reset-password/${passwordResetToken}`
    );

    return res
      .status(200)
      .json({ status: true, message: "Password reset link Sent" });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      status: false,
      message: "Internal Server Error",
      data: {
        error: error.message,
        body: process.env.ENVIROMENT == 'dev' ? req.body : {}
      }
    });
  }
};

function allowedRoles(role) {
  switch (role) {
    case "ADMIN":
    case "CREW":
    case "GUEST":
    case "TICKETING":
      return true;
    default:
      return false;
  }
}
