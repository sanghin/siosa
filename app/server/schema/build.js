const { Schema } = require('mongoose');

const BuildSchema = new Schema({
  pob: Object,
  importedAt: Date,
});

module.exports = BuildSchema;
