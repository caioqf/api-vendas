import { Request, Response } from "express";

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUserService;
    
  } 
}
