import { BRANDS_SEED, CARS_SEED } from './data';

import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  populateDB() {
    return `Seed executed`;
  }
}
