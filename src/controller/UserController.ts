import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { enumRoles } from '../models/enums/EnumRoles';
import { UserRepository } from '../repositories/UserRepository';
import { RoleRepository } from '../repositories/RoleRepository';

export class UserController {
  /**
   * @swagger
   * /user:
   *   post:
   *     summary: Criação de um usuário
   *     tags: [User]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: Dados do usuário que serão criados.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               description: Nome do usuário.
   *             email:
   *               type: string
   *               description: Email do usuário.
   *             password:
   *               type: string
   *               description: Senha do usuário.
   *             role:
   *                 type: string
   *                 description: IDs das roles atribuídas ao usuário.
   *     responses:
   *       200:
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
   *                 user:
   *                   type: object
   *                   properties:
   *                     name:
   *                       type: string
   *                       description: Nome do usuário
   *                       example: "Usuario"
   *                     password:
   *                       type: string
   *                       description: Senha do usuário (hash)
   *                       example: "$2a$10$86a5AgfCzdXBX5AXXxsjYu9LTHZvQmSD.DZLFzhbcvC4FhDgGp8LS"
   *                     email:
   *                       type: string
   *                       description: Email do usuário
   *                       example: "Usuario@email.com"
   *                     roles:
   *                       type: array
   *                       items:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: integer
   *                             description: ID da role
   *                             example: 1
   *                           authType:
   *                             type: string
   *                             description: Nome da role de acordo com o enum EnumRoles
   *                             example: "ADMIN"
   *                           description:
   *                             type: string
   *                             description: Descrição da role
   *                             example: "Usuário administrador"
   *                           createdAt:
   *                             type: string
   *                             format: date-time
   *                             description: Data de criação da role
   *                             example: "2024-10-14T14:53:33.000Z"
   *                           updatedAt:
   *                             type: string
   *                             format: date-time
   *                             description: Data da última atualização da role
   *                             example: "2024-10-14T14:53:33.000Z"
   *                     id:
   *                       type: integer
   *                       description: ID do usuário
   *                       example: 7
   *                     createdAt:
   *                       type: string
   *                       format: date-time
   *                       description: Data de criação do usuário
   *                       example: "2024-10-15T03:33:28.000Z"
   *                     updateAt:
   *                       type: string
   *                       format: date-time
   *                       description: Data da última atualização do usuário
   *                       example: "2024-10-15T03:33:28.000Z"
   *       '500':
   *         description: Erro ao criar usuário, dados ausentes, inválidos ou duplicados
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
   *                   example: "Usuário deve ter nome, email, senha e níveis de permissão"
   */

  async saveUser(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    const userRepository = new UserRepository();
    const roleRepository = new RoleRepository();

    try {
      if (!name || !email || !password || !role) {
        return res.status(500).json({
          statusCode: 500,
          message: 'Usuário deve ter nome, email, senha e níveis de permissão'
        });
      }

      if (!Object.values(enumRoles).includes(role)) {
        return res
          .status(500)
          .json({ statusCode: 500, message: 'Permissão incorreta' });
      }

      const hashedPassword: string = await bcrypt.hash(password, 10);

      const roleEnum = await roleRepository.findRoleByName(role);

      await userRepository.saveUser(name, email, hashedPassword, roleEnum);

      return res
        .status(200)
        .json({ status: 'Sucess', message: 'Usuario criado' });
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error.message });
    }
  }
}
