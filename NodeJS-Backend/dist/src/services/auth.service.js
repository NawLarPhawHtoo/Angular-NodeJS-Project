"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutService = exports.loginService = void 0;
const bcrypt_1 = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const loginService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    User_1.default.findOne({ email: req.body.email }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Could not find user"
            });
        }
        if (!(0, bcrypt_1.compareSync)(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password"
            });
        }
        const payload = {
            email: yield bcrypt_1.default.hash(user.email, 12),
            id: yield bcrypt_1.default.hash(user.id, 12)
        };
        const token = jsonwebtoken_1.default.sign(payload, 'secret', { expiresIn: '1d' });
        return res.status(200).json({
            success: true,
            token: token,
            user: user,
            message: "Login Successfully!"
        });
    }));
});
exports.loginService = loginService;
const logoutService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session = null;
    return res.status(200).json({
        success: true,
        message: "Logout Successfully!"
    });
});
exports.logoutService = logoutService;
