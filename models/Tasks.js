const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    // к кому привязаны задачи
    pageId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Tasks", schema);
