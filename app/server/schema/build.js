const { Schema } = require('mongoose');

const BuildSchema = new Schema({
  PathOfBuilding: Object,
  importedAt: Date,
});

module.exports = BuildSchema;
