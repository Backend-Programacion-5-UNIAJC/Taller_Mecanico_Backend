import { Request, Response } from "express";
import * as authService from '../services/auth.service';
import { AuthRequest} from '../middlewares/auth.middleware';

export async function register(req:Request, res:Response) {
    const { name,email,password } = req.body;
    const user = await authService.register({ name, email, password });
    res.status(201).json(user);
}

export async function login (req: Request, res: Response){
    const {email, password} = req.body;
    const token = await authService.loggin(email,password);
    return res.status(200).json({token});
}

export async function me(req:AuthRequest, res: Response) {
    const user = await authService.getProfile(req.user!.id);
    res.status(200).json(user);
}