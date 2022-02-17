const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    headMsg: {type: String, required: true},
    bodyMsg: {type: String, required: true},
    date: {type: String, require: true},
    fromName: {type: String, required: true},
    fromEmail: {type: String, required: true},
    toName: {type: String, required: true},
    toEmail: {type: String, required: true},
});

module.exports = model('Message', schema);