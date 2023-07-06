import {Schema, model, models} from 'mongoose';

const schema = new Schema({
    to: {required:true, type: String},
    dateTime: {required:true, type: String},
   body:String
})

const schemaModel = models.email || model('email', schema);

export default schemaModel;