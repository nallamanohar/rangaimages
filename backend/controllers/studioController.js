const Studio = require("../models/studioModel");
const Service = require("../models/serviceModel");
const factory = require("./handlerController");

exports.createStudio = factory.createOne(Studio);
exports.getStudio = factory.getAll(Studio);
exports.updateStudio = factory.updateOne(Studio);

// Packages
exports.createService = factory.createOne(Service);
exports.getService = factory.getAll(Service);
exports.updateService = factory.updateOne(Service);
