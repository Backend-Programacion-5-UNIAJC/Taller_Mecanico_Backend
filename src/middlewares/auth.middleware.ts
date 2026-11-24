import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth.service';
import { AuthUser, Role } from '../models/user.model';
import { AppError } from '../errors/app-error';

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return next(new AppError(401, 'Token no proporcionado', 'TOKEN_MISSING'));
  }

  const token = header.slice('Bearer '.length).trim();
  if (!token) {
    return next(new AppError(401, 'Token no proporcionado', 'TOKEN_MISSING'));
  }

  try {
    req.user = verifyToken(token);
    return next();
  } catch (err) {
    if (err instanceof Error && err.message.includes('JWT_SECRET')) {
      return next(err);
    }
    return next(new AppError(401, 'Token invalido o expirado', 'TOKEN_INVALID'));
  }
}

// Autorizacion por rol: que puedes hacer? Rol que no esta en la lista -> 403
export function requireRole(...roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, 'Token no proporcionado', 'TOKEN_MISSING'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, 'No tienes permisos para esta accion', 'FORBIDDEN_ROLE'));
    }

    return next();
  };
}