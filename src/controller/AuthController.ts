import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RouteResponse } from '../helpers/RouteResponse';
import { TokenRepository } from '../repositories/TokenRepository';
import { UserRepository } from '../repositories/UserRepository';

export class AuthController {
  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Autenticação do Usuário
   *     tags: [Login]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: Login
   *         description: Credenciais do usuário para login
   *         schema:
   *           type: object
   *           required:
   *             - email
   *             - password
   *           properties:
   *             email:
   *               type: string
   *               example: "usuario@email.com"
   *             password:
   *               type: string
   *               example: "senha123"
   *     responses:
   *       '200':
   *         description: Requisição executada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: Status da requisição
   *                   example: "Success"
   *                 token:
   *                   type: string
   *                   description: Token JWT de autenticação
   *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *       '500':
   *         description: Dados incorretos
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: number
   *                   example: 500
   *                 message:
   *                   type: string
   *                   example: "Nome de usuário ou senha incorretos"
   *       '404':
   *         description: Dados do usuário incorretos
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: number
   *                   example: 404
   *                 message:
   *                   type: string
   *                   example: "Nome de usuário ou senha incorretos"
   */
  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    const tokenRepository = new TokenRepository();
    const userRepository = new UserRepository();

    const existingUser = await userRepository.findUserByEmail(email);

    if (!existingUser) {
      return RouteResponse.notFound(
        response,
        'Nome de usuário ou senha incorretos'
      );
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return RouteResponse.error(
        response,
        'Nome de usuário ou senha incorretos'
      );
    }

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
    const expiresAt = new Date(decoded.exp * 1000);

    tokenRepository.save({ token, expiresAt, existingUser });

    return RouteResponse.sucess(response, token);
  }
}
