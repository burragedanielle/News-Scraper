const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    headline: {
        type: String,
    },
    summary: {
        type: String,
    },
    url: {
        type: String,
    },
    // comment: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Comment"
    // }]
});

module.exports = mongoose.model("Article", ArticleSchema);