const portfolio = require("../models/portfolioModel");
const portfolioImages = require("../models/portfolioImageModel");
const factory = require("./handlerController");

exports.createPortfolio = factory.createOne(portfolio);
exports.getPortfolio = factory.getAll(portfolio);
exports.updatePortfolio = factory.updateOne(portfolio);
exports.deletePortfolio = factory.deleteOne(portfolio);
