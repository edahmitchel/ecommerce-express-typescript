import { Types } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    phone: number;
    password: string;
    isAdmin: boolean;
    createdAt: Date;

}

export interface IProduct {
    name: string;
    price: number;
    stock: number;
    description: string;
    collection: string;
    sizes?: number
}
export interface IOrder {
    products: Types.DocumentArray<IProduct>;
    price: number;
    userId: Types.ObjectId
    shippingStatus: boolean;

}
export interface ICustomOrder {
    name: string;
    phone: number;
    clothingStyle: string;
    extraInformation: string;
}
export interface IShipping {
    address: string;
    orderId: Types.ObjectId
}
export interface IPayment {
    orderId: Types.ObjectId
    price: number
    isVerified:boolean

}