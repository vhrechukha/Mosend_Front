import { User } from ".";

export interface  SigninResponse {
    token: string;
    user: User;
}
