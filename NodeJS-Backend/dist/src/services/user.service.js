"use strict";
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
exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.findUserService = exports.getUserService = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        if (!users) {
            return res.status(404).send({
                error: "User not found",
            });
        }
        else {
            res.json({
                message: "Users Fetched",
                data: users,
                status: 1
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getUserService = getUserService;
const findUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            const error = Error('Not Found');
            error.statusCode = 401;
        }
        res.json({
            data: user,
            status: 1
        });
    }
    catch (err) {
        next(err);
    }
});
exports.findUserService = findUserService;
const createUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userTo = {
            name: req.body.name,
            email: req.body.email,
            password: yield bcrypt_1.default.hash(req.body.password, 12),
            phone: req.body.phone,
            birthday: req.body.birthday,
            gender: req.body.gender,
            address: req.body.address,
            type: req.body.type,
            profile: req.body.profile,
            created_user_id: req.body.created_user_id
        };
        const user = new User_1.default(userTo);
        const result = yield user.save();
        res.status(201).json({
            message: "Created user successfully!",
            data: result,
            status: 1
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createUserService = createUserService;
const updateUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.params.id);
        if (!user) {
            const error = Error('Not Found');
            error.statusCode = 401;
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.birthday = req.body.birthday;
        user.gender = req.body.gender;
        user.address = req.body.address;
        user.type = req.body.type;
        user.created_user_id = req.body.created_user_id;
        user.updated_user_id = req.body.updated_user_id;
        const result = yield user.save();
        res.json({
            message: "Updated user successfully!",
            data: result,
            status: 1
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateUserService = updateUserService;
const deleteUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndRemove(req.params.id);
        if (!user) {
            const error = Error('Not Found');
            error.statusCode = 401;
        }
        res.json({
            message: "User deleted successfully!",
            data: user,
            status: 1
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUserService = deleteUserService;