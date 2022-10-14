"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    birthday: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    profile: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    skill: {
        type: String,
        default: ""
    },
    experience: {
        type: String,
        default: ""
    },
    created_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    updated_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    deleted_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    deleted_at: {
        type: Date
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("User", userSchema);
