import { User } from "@prisma/client";
import { Request } from "express";

export interface PayLoad extends Request{
    payload:User;
}