const mongoose = require('mongoose');
const schema = mongoose.Schema;

const buildsSchema = new schema({
  PathOfBuilding: Object,
  importedAt: Date,
});

module.exports = mongoose.model('builds', buildsSchema);
