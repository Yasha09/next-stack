interface ISignupRequest {
    email: string;
    password: string;
    name: string;
}

interface ISignInRequest {
    password: string;
    email: string;
}

interface ISignUpResponse {
    user: IUserResponse,
    accessToken: string
}

interface IUser {
    id: number;
    name: string;
    email: string;
}

interface  IUserResponse {
    id: number;
    email: string;
    name: string;
}