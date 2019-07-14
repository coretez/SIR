const mongoose = require('mongoose');

const { Schema } = mongoose;

const artifactModel = new Schema(
  {
    name: String,
    artifact: Object
  }
);

const Artifact = mongoose.model('Artifact', artifactModel);
module.exports = Artifact;
