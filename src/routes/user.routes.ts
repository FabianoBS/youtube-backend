import { Router } from "express";
import { Request, Response } from 'express';
import { UserRepository } from "../modules/user/repositories/UserRepository.js";

const userRoutes = Router();
const userRepository = new UserRepository();

userRoutes.post('/sign-up', (req: Request, res: Response) => {
    userRepository.create(req, res);
})

userRoutes.post('/sign-in', (req: Request, res: Response) => {
    userRepository.login(req, res);
})

export { userRoutes };