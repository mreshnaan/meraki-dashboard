import mongoose, { Schema, model, models } from "mongoose";

const schema = new Schema({
  seller: { type: Schema.Types.ObjectId, ref: "user" },
  event: { type: Schema.Types.ObjectId, ref: "event" },
  ticketType: { type: Schema.Types.ObjectId, ref: "tickettype" },
  ticketOwner: { type: Schema.Types.ObjectId, ref: "user" },
  ticketHolder: { type: Schema.Types.ObjectId, ref: "user" },
  attended: { type: Boolean, default: false },
  logs: [String],
  secret: String,
  group: String,
  comment: String
});

const schemaModel = models.ticket || model("ticket", schema);

export default schemaModel;
