import { BRANDS_SEED, CARS_SEED } from './data';

import { BrandsService } from '../brands/brands.service';
import { CarsService } from '../cars/cars.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor(
    private readonly brandService: BrandsService,
    private readonly carService: CarsService,
  ) {}

  populateDB() {
    this.brandService.fillBrandsWithSeedData(BRANDS_SEED);
    this.carService.fillCarsWithSeedData(CARS_SEED);
    return `Seed executed`;
  }
}
