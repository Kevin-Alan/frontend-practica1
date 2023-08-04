import { Key } from "react";

export interface IUsers {
    readonly id: Key;
    readonly name: string;
    readonly lastname: string;
    readonly email: string;
    readonly createdAt: Date;
}
