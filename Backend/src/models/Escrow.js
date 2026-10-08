import mongoose from "mongoose";


const escrowSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    milestone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Milestone",
        required: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    contributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    token: {
        type: String,
        enum: ["ETH", "USDC", "USDT"],
        default: "ETH",
    },
    chain: {
        type: String,
        default: "sepolia",
    },
    contractAddress: {
        type: String,
        trim: true,
    },
    fundingTxHash: {
        type: String,
        trim: true,
    },
    releaseTxHash: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: [
            "created",
            "funded",
            "released",
            "refunded",
            "disputed",
        ],
        default: "created",
    },
    onChainEscrowId: {
        type: Number,
        required: true,
        unique: true,
    },
},
    {
        timestamps: true,
    }
);

const Escrow = mongoose.model("Escrow", escrowSchema);

export default Escrow;