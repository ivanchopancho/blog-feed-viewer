import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User",
    },
    content: {
        type: String,
        required: true,
        maxlength: 500
    },
    likesCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model("Post", postSchema);