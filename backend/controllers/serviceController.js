const Service = require("../models/serviceModel");
const factory = require("./handlerController");

// Packages
exports.createService = factory.createOne(Service);
exports.getService = factory.getAll(Service);
exports.updateService = factory.updateOne(Service);
exports.deleteService = factory.deleteOne(Service);
