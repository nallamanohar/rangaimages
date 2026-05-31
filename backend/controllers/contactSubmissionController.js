const contactSubmission = require("../models/contactSubmissionModel");
const factory = require("./handlerController");

exports.createContactSubmission = factory.createOne(contactSubmission);
exports.getcontactSubmission = factory.getAll(contactSubmission);
exports.updatecontactSubmission = factory.updateOne(contactSubmission);
exports.deletecontactSubmission = factory.deleteOne(contactSubmission);
