import mongoose, {Schema, model, models} from 'mongoose';

const schema = new Schema({
    name: {required:true, type: String},
    price: {required:true, type: Number},
    event: {type:Schema.Types.ObjectId, ref:"event"}
})

const schemaModel = models.tickettype || model('tickettype', schema);

export default schemaModel;