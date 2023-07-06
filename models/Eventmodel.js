import {Schema, model, models} from 'mongoose';

const schema = new Schema({
    name: {required:true, type: String},
    imageUrl: {required:true, type: String},
    eventDate: String,
    venue: String,
    completed: {required:true, type:Boolean, default:false},
    canUpdateTickets: {required:true, type:Boolean, default:true},
    ticketTypes: [{type:Schema.Types.ObjectId, ref:"tickettype"}]
})

const schemaModel = models.event || model('event', schema);

export default schemaModel;