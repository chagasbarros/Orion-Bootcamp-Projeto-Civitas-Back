import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BadRequestError, NotFoundError, ok } from '../helpers/apiReturns';

const users = [{ username: 'Rizon', password: 'Riz0n!' }];
const JWT_SECRET = 'Rizon-bootcamp';

export class LoginController {
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
   *             - username
   *             - password
   *           properties:
   *             username:
   *               type: string
   *               example: "usuario123"
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
   *                 content:
   *                   type: string
   *                   description: Token JWT de autenticação
   *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *       '400':
   *         description: Dados incorretos
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: number
   *                   example: 400
   *                 message:
   *                   type: string
   *                   example: "Dados Incorretos"
   *       '404':
   *         description: Usuário não encontrado
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
   *                   example: "Usuário não encontrado"
   */
  async login(request: Request, response: Response) {
    const { username, password } = request.body;

    // TODO: Buscar no banco de dados a existencia do usuario ao inves de array user
    const existingUser = users.find((user) => user.username === username);

    if (!existingUser)
      return new NotFoundError(response, 'Usuário não encontrado');

    const Userpassword = await bcrypt.hash(existingUser.password, 10);

    const validPassword = await bcrypt.compare(password, Userpassword);
    if (!validPassword)
      return new BadRequestError(response, 'Dados Incorretos');

    const token = jwt.sign({ username: existingUser.username }, JWT_SECRET, {
      expiresIn: '4h'
    });

    return new ok(response, token);
  }
}
