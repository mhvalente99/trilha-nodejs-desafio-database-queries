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
    const game: Game[] = [];
    return game;//this.repository
      //.createQueryBuilder()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return [{ count: "" }];//this.repository.query(); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const user: User[] = [];
    return user;//this.repository
      //.createQueryBuilder()
      // Complete usando query builder
  }
}
