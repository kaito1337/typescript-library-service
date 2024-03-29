import bcrypt from "bcrypt";
import { Configuration } from "configuration";
import { IUserModelCreation, User } from "../UserEntity";
import { IUserRepository } from "./UserRepository.interfaces";

class UserRepository implements IUserRepository {
  public async findByPk(id: number): Promise<any> {
    return await User.findByPk(id);
  }

  public async create(data: IUserModelCreation): Promise<any> {
    
    return await User.create({
      name: data.name,
      login: data.login,
      password: await bcrypt.hash(data.password, +Configuration.bcrypt.rounds),
      listEditors: [],
      takedBooks: [],
    });
  }

  public async findByLogin(login: string): Promise<any> {
    return await User.findOne({
      where: {
        login,
      },
    });
  }

  public async updateUser(login: string, data: any): Promise<any> {
    return await User.update(data , { where: { login } })
  }
}

export { UserRepository };
