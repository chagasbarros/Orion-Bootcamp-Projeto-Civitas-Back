import { Response } from 'express';

export class RouteResponse {
  /**
   * Resposta da requisição caso tenha sido concluída com sucesso
   * @param res Variável Response do express
   * @param content Conteúdo a ser retornado
   * @param message Mensagem a ser retornada, por padrão a mensagem é 'Success'
   * @returns Resposta da requisição
   */
  public static sucess(res: Response, content, message?: string) {
    return res.status(200).json({ message: message || 'Sucess', content });
  }

  /**
   * Resposta da requisição de criação de algum objeto caso tenha sido concluída com sucesso
   * @param res Variável Response do express
   * @param content Conteúdo a ser retornado
   * @param message Mensagem a ser retornada, por padrão a mensagem é 'Success'
   * @returns Resposta da requisição
   */
  public static sucessCreated(res: Response, content, message?: string) {
    return res
      .status(201)
      .json({ message: message || 'Sucess Create', content });
  }

  /**
   * Resposta da requisição caso tenha sido concluída com sucesso, mas sem nenhum objeto retornado
   * @param res Variável Response do express
   * @param message Mensagem a ser retornada, por padrão a mensagem é 'Success'
   * @returns Resposta da requisição
   */
  public static successEmpty(res: Response, message?: string) {
    return res.status(204).json({ message: message || 'Sucess' });
  }

  /**
   * Resposta da requisição caso tenha sido concluída com um erro genérico
   * @param res Variável Response do express
   * @param message Mensagem a ser retornada, por padrão a mensagem é 'Bad Request'
   * @returns Resposta da requisição
   */
  public static error(res: Response, message?: string) {
    return res.status(400).json({ message: message || 'Bad Request' });
  }

  /**
   * Resposta da requisição caso tenha sido concluída com um erro de servidor
   * @param res Variável Response do express
   * @param message Mensagem a ser retornada, por padrão a mensagem é 'Server Error'
   * @returns Resposta da requisição
   */
  public static serverError(res: Response, message?: string) {
    return res.status(500).json({ message: message || 'Server Error' });
  }

  /**
   * Resposta da requisição caso tenha sido concluída com um erro de não encontrado
   * @param res Variável Response do express
   * @param message Mensagem a ser retornada, por padrão a mensagem é 'Entity not found'
   * @returns Resposta da requisição
   */
  public static notFound(res: Response, message?: string) {
    return res.status(404).json({ message: message || 'Entity not found' });
  }

  /**
   * Resposta da requisição caso tenha sido concluída com um erro de autorização
   * @param res Variável Response do express
   * @param message Mensagem a ser retornada, por padrão a mensagem é 'Unauthorized Access'
   * @returns Resposta da requisição
   */
  public static unauthorizedError(res: Response, message?: string) {
    return res.status(401).json({ message: message || 'Unauthorized Access' });
  }
}
