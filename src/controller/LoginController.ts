import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BadRequestError, NotFoundError } from '../helpers/apiErrors';

const users = [{ username: 'Rizon', password: 'Riz0n!' }];

const JWT_SECRET = 'Rizon-bootcamp';

export class LoginController {
  async login(request: Request, response: Response) {
    const { username, password } = request.body;

    // TODO: Buscar no banco de dados a existencia do usuario ao inves de array user
    const existingUser = users.find((user) => user.username === username);

    if (!existingUser) throw new NotFoundError('User not found');

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) throw new BadRequestError('Incorrect login');

    const token = jwt.sign({ username: existingUser.username }, JWT_SECRET, {
      expiresIn: '4h'
    });

    return response.status(200).json({ token });
  }
}
