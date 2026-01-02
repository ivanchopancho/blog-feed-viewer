import mongoose, { mongo } from "mongoose";



const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    post: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Post"
    }
}, { timestamps: true });

// this line prevents double-like
likeSchema.index({ user: 1, post: 1, }, { unique: true });

export default mongoose.model("Like", likeSchema);