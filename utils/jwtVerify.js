const jwt = require("jsonwebtoken");
const _ = require("lodash");

export const ROLES = {
  ADMIN: "ADMIN",
  CREW: "CREW",
  GUEST: "GUEST",
  TICKETING: "TICKETING",
};

export const checkRoleMiddleWare = (req, roles) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) throw new Error("Missing Access token");

  const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

  if (_.includes(roles, decodedPayload.role)) {
    return decodedPayload;
  } else {
    throw new Error("Sorry, you don't have permission for this action");
  }
};
