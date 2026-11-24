import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/user.repository';
import { AuthUser, RegisterInput } from '../models/user.model';
import { AppError } from '../errors/app-error';

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('Falta JWT_SECRET en el archivo .env');
  return secret;
}

export async function register({ name, email, password }: RegisterInput) {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await userRepository.findByEmail(normalizedEmail);

  if (existingUser) {
    throw new AppError(409, 'El correo ya esta registrado', 'EMAIL_TAKEN');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return userRepository.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: 'CLIENT',
  });
}

export async function loggin(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await userRepository.findByEmail(normalizedEmail);

  if (!user) {
    throw new AppError(401, 'Credenciales invalidas', 'INVALID_CREDENTIALS');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new AppError(401, 'Credenciales invalidas', 'INVALID_CREDENTIALS');
  }

  const payload: AuthUser = { id: user.id, role: user.role };
  return Jwt.sign(payload, getSecret(), { expiresIn: '2h' });
}

export function verifyToken(token: string): AuthUser {
  return Jwt.verify(token, getSecret(), { algorithms: ['HS256'] }) as AuthUser;
}

export async function getProfile(id: number) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new AppError(404, 'Usuario no encontrado', 'USER_NOT_FOUND');
  }
  return user;
}