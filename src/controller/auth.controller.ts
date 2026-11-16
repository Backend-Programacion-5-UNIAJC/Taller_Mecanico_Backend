import { Request, Response } from "express";
import * as authService from '../services/auth.service';
import { AuthRequest} from '../middlewares/auth.middleware';

export async function register(req:Request, res:Response) {
    const { name,email,password } = req.body ?? {};
    if(!name || !email || !password){
        return res.status(400).json({error: 'name, email y password son obligatorios'});
    }

    const user = await authService.register({ name, email, password });
    if(!user) {
        return res.status(409).json({error: 'El email ya se encuenta registrado'});
    }
    res.status(201).json(user);
}

export async function login (req: Request, res: Response){
    const {email, password} = req.body?? {};
    if(!email || !password){
        return res.status(400).json({error: 'email y password son obligatorios'});
    }

    const token = await authService.loggin(email,password);
    if(!token){
        return res.status(401).json({error: 'Credenciales Invalidas'})
    }
    return res.status(200).json(token);
}

export async function me(req:AuthRequest, res: Response) {
    const user = await authService.getProfile(req.user!.id);
    if(!user){
        return res.status(404).json({error: 'usuario no encontrado'})
    }
    res.status(200).json(user);
}