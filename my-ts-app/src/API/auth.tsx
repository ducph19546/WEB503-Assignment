import { IUser } from "../interfaces/user"
import instance from "./instance"

export const signIn = (data: IUser) => {
    return instance.post("/sign-in", data)
}
export const register = (data: IUser) => {
    return instance.post("/register", data)
}