"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./src/routes/user.route"));
dotenv_1.default.config();
mongoose_1.default.connect(`${process.env.MONGO_URL}`, {}, err => {
    if (!err) {
        console.log('Database connection successed!');
    }
    else {
        console.log('Database connection failed!' + err);
    }
});
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api/users', user_route_1.default);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
