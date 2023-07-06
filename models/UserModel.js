import {Schema, model, models} from 'mongoose';

const schema = new Schema({
    fullName: {required:true, type: String},
    email: {required:true, type: String, unique: true},
    password: {required:false, type: String},
    role: {required:true, type: String},
    mobile: {required:false, type: String},
    passwordResetToken: {required:false, type: String}
})

const schemaModel = models.user || model('user', schema);

export default schemaModel;