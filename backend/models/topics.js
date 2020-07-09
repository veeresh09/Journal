const mongoose = require("mongoose");

const TopicSchema = mongoose.Schema({
  topicname: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Topics", TopicSchema);
