import { Request, Response } from 'express';
// import { RouteResponse } from '../helpers/RouteResponse';
import { enumRoles } from '../models/enums/EnumRoles';
import { RoleRepository } from '../repositories/RoleRepository';

export class RoleController {
  /**
   * @swagger
   * /role:
   *   post:
   *     summary: Criação de uma Role
   *     tags: [Role]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: TEACHER
   *         description: Nome do nível de permissão
   *         schema:
   *           type: object
   *           required:
   *             - name
   *             - description
   *           properties:
   *             name:
   *               type: string
   *               example: "ADMIN"
   *             description:
   *               type: string
   *               example: "Descrição do ADMIN"
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
   *                 role:
   *                   type: object
   *                   properties:
   *                     authType:
   *                       type: string
   *                       description: Nome da role de acordo com o enum EnumRoles
   *                       example: "ADMIN"
   *                     description:
   *                       type: string
   *                       description: Descrição da role
   *                       example: "Usuário professor"
   *                     createdAt:
   *                       type: string
   *                       format: date-time
   *                       description: Data de criação da role
   *                       example: "2024-10-14T20:14:48.586Z"
   *                     updatedAt:
   *                       type: string
   *                       format: date-time
   *                       description: Data da última atualização da role
   *                       example: "2024-10-14T20:14:48.586Z"
   *                     id:
   *                       type: integer
   *                       description: ID da role
   *                       example: 11
   *       '500':
   *         description: Ausência de nome ou descrição da role, nível de permissão inexistente ou role já existente
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
   *                   example: "Permissão incorreta"
   */
  async createRole(req: Request, res: Response) {
    const { name, description } = req.body;

    const roleRepository = new RoleRepository();

    if (!name || !description) {
      return res
        .status(500)
        .json({ statusCode: 500, message: 'Role deve ter nome e descrição' });
    }

    if (!Object.values(enumRoles).includes(name)) {
      return res
        .status(500)
        .json({ statusCode: 500, message: 'Permissão incorreta' });
    }

    const existingRole = await roleRepository.findRoleByName(name);

    if (existingRole) {
      res.status(500).json({ statusCode: 500, message: 'Role já existente' });
    }

    const role = await roleRepository.saveRole(
      enumRoles[name as keyof enumRoles],
      description
    );

    return res.status(200).json({ status: 'Sucess', role });
  }
}
