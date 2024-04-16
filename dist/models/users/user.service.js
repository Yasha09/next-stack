"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const User_entity_1 = require("../../entity/User.entity");
class UserService {
    async getOne(credential) {
        const userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
        return userRepository.findOne({
            where: credential
        });
    }
    async createOne(data) {
        const userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
        const user = userRepository.create(data);
        return userRepository.save(user);
    }
}
const userService = new UserService();
exports.default = userService;
