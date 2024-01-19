"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_routes_1 = __importDefault(require("./routes/todos-routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_error_1 = require("./models/http-error");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});
app.use("/api", todos_routes_1.default);
app.use((req, res, next) => {
    const error = new http_error_1.HttpError("could not find this route.", 404);
    throw error;
});
mongoose_1.default
    .connect('mongodb://127.0.0.1:27017/todos')
    .then(() => {
    app.listen(5000);
    //console.log("server is running")
})
    .catch((err) => {
    console.log(err);
});
