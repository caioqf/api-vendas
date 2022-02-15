import { Request, Response } from "express";
import ListUserService from "../services/ListUserService";

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response>{
    const listUsers = new ListUserService;
    
    const users = await listUsers.execute();

    return res.json(users)
  } 
}
