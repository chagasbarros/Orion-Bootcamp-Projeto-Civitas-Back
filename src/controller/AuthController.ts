import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RouteResponse } from '../helpers/RouteResponse';
import { User } from '../entity/User';
import { TokenRepository } from '../repositories/TokenRepositorie';
import { enumRoles } from '../entity/Role';

const users: User[] = [
  {
    name: 'Murilo',
    password: 'senha',
    email: 'email',
    createdAt: undefined,
    setCreatedAt: function (): void {
      throw new Error('Function not implemented.');
    },
    updateAt: undefined,
    setUpdateAt: function (): void {
      throw new Error('Function not implemented.');
    },
    roles: [],
    id: 0
  }
];

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
   *                  content:
   *                   type: string
   *                   description: Status da requisição
   *                   example: "Sucess"
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
   *                   example: "Nome de usuário ou senha incorretos"
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
   *                   example: "Nome de usuário ou senha incorretos"
   */
  async login(request: Request, response: Response) {
    const { username, password, role } = request.body;
    const tokenRepository = new TokenRepository();

    // TODO: Buscar no banco de dados a existencia do usuario ao inves de array user
    const existingUser = users.find((user) => user.name === username);

    if (!existingUser)
      return RouteResponse.notFound(
        response,
        'Nome de usuário ou senha incorretos'
      );

    if (!role || !Object.values(enumRoles).includes(role)) {
      return RouteResponse.error(response, 'Permissão incorreta');
    }

    // TODO: conferir se o usuário tem nivel de permissão pedido

    const Userpassword = await bcrypt.hash(existingUser.password, 10);

    const validPassword = await bcrypt.compare(password, Userpassword);
    if (!validPassword)
      return RouteResponse.error(
        response,
        'Nome de usuário ou senha incorretos'
      );

    const existingToken = await tokenRepository.findTokenByUserIdAndRole(
      existingUser.id,
      role
    );

    console.log(existingToken);

    if (existingToken) {
      jwt.verify(
        existingToken.token,
        process.env.JWT_SECRET,
        function (err, decoded) {
          if (!err) return RouteResponse.sucess(response, decoded);
          else tokenRepository.remove(existingToken);
        }
      );
    }

    const token = jwt.sign(
      { username: username, role: role },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    );

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
    const expiresAt = new Date(decoded.exp * 1000);

    tokenRepository.saveToken(token, expiresAt, existingUser.id);

    return RouteResponse.sucess(response, token);
  }

  async middleware(req: Request, res: Response, next) {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.includes('Bearer')
    ) {
      return RouteResponse.unauthorizedError(
        res,
        'Token de autenticação não informado'
      );
    } else {
      const token = req.headers.authorization.replace('Bearer ', '');
      jwt.verify(token, process.env.JWT_SECRET, function (err) {
        if (err) RouteResponse.unauthorizedError(res, err.message);
        else next();
      });
    }
  }
}
