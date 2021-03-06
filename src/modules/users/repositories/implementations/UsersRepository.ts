import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne(user_id, {
      relations: ['games']
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const SQL = 'SELECT * FROM users ORDER BY first_name';

    const users: User[] = await this.repository.query(SQL);
    return users;
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const SQL = 'SELECT * FROM users WHERE LOWER(first_name) = $1 AND LOWER(last_name) = $2';

    const user: User[] | undefined = await this.repository.query(SQL, [first_name.toLowerCase(), last_name.toLowerCase()]);

    return user;
  }
}
