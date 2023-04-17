import mongoose from "mongoose";
export interface IUser{
    [x: string]: any;
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: "admin" | "user"|undefined;
}
export interface IUserLogin{
    email: string;
    password: string;
}
export interface IUserSignup{
    _id: any;
    name: string;
    email: string;
    password: string;
    role: "admin"|"user"|undefined;
}
