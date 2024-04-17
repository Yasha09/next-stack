import {SignUpDto} from "./dto/signUp.dto";
import userService from "../users/user.service";
import {User} from "../../entity/User.entity";
import {comparePasswords, setPassword} from "./utils/bcrypt.utils";
import accessTokenModel from "./utils/jwt.utils";
import {Exception} from "../../errorHandler/exception";


class AuthService {
    async signUp(userData: SignUpDto): Promise<User> {
        const user: User | null = await userService.getOne({email: userData.email});

        if (user) {
            throw new Exception(400, {message: 'User already exists'});
        }

        const hashedPassword: string = await setPassword(userData.password);

        return userService.createOne({
            email: userData.email,
            name: userData.name,
            password: hashedPassword
        });
    }

    async signIn(email: string, password: string): Promise<{
        user: IUserResponse,
        accessToken: string
    }> {

        const user: User | null = await userService.getOne({email});

        if (!user) {
            throw new Exception(400, {message: 'User not found'});
        }

        const isPasswordCorrect: boolean = await comparePasswords(password, user.password);

        if (!isPasswordCorrect) {
            throw new Exception(400, {message: 'Invalid password'});

        }

        const accessToken = await accessTokenModel.create(user);

        return {
            user: this.userResponse(user),
            accessToken
        }

    }


    userResponse(user: User): IUserResponse {
        return {
            id: user.id,
            email: user.email,
            name: user.name
        }
    }


}


const authService = new AuthService();
export default authService;
