import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User",
    },
    post: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Post"
    },
    content: {
        type: String,
        required: true,
        maxlength: 500
    }
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);