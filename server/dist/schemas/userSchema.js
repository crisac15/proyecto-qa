"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deteleUserById = exports.createUser = exports.getUserById = exports.getUser = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: "User",
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
const getUsers = () => exports.UserModel.find();
exports.getUsers = getUsers;
const getUser = (name) => exports.UserModel.findById({ name });
exports.getUser = getUser;
const getUserById = (id) => exports.UserModel.findById(id);
exports.getUserById = getUserById;
const createUser = (values) => new exports.UserModel(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const deteleUserById = (name) => exports.UserModel.findByIdAndDelete({ name });
exports.deteleUserById = deteleUserById;
//# sourceMappingURL=userSchema.js.map