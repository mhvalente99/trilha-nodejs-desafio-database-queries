import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const game = await this.repository
      .createQueryBuilder()
      .where('LOWER(title) LIKE :title', { title: `%${param.toLocaleLowerCase()}%` })
      .getMany();

    return game;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const SQL = 'SELECT COUNT(*) FROM games';
    const countGames = await this.repository.query(SQL);

    return countGames;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const user: User[] = [];
    return user;//this.repository
      //.createQueryBuilder()
      // Complete usando query builder
  }
}
