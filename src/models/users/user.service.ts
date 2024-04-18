import {AppDataSource} from "../../data-source";
import {User} from "../../entity/User.entity";

class UserService {
    async getOne(credential: {
        id?: number, // todo add types
        email?: string
    }): Promise<User | null> {
        const userRepository = AppDataSource.getRepository(User);

        return userRepository.findOne({
            where: credential
        });
    }

    async createOne(data: ISignupRequest): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);

        const user = userRepository.create(data);

        return userRepository.save(user);
    }
}

const userService = new UserService();
export default userService;
