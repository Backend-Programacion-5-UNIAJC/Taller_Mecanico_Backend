import { Request, Response, NextFunction} from 'express';
import { verifyToken } from '../services/auth.service';
import { AuthUser, Role } from '../models/user.model';

export interface AuthRequest extends Request {
    user?: AuthUser;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction){
    const header = req.headers.authorization;

    if(!header || !header.startsWith('Bearer')) {
        return res.status(401).json({ error: 'Token No Proporcionado '})
    }

    const tokent = header.split(' ')[1];
    try{
        req.user = verifyToken(tokent);
        next();
    }catch{
        return res.status(401).json({error: 'Token Invalido o expirado'})
    }
}

export function requireRole(...roles: Role []) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if(!req.user || !roles.includes(req.user.role)){
            return res.status(403).json({error: 'No tienes permisos para esta accion'})
        }
        next();
    };
}