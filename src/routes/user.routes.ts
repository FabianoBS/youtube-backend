import { Router } from "express";
import { Request, Response } from 'express';
import { UserRepository } from "../modules/user/repositories/UserRepository.js";
import { login } from "../middleware/login.js";

const userRoutes = Router();
const userRepository = new UserRepository();

userRoutes.post('/sign-up', (req: Request, res: Response) => {
    userRepository.create(req, res);
})

userRoutes.post('/sign-in', (req: Request, res: Response) => {
    userRepository.login(req, res);
})

userRoutes.get('/get-user', login, (req: Request, res: Response) => {
    userRepository.getUser(req, res);
})

export { userRoutes };