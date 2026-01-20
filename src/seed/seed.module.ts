import { BrandsModule } from '../brands/brands.module';
import { CarsModule } from '../cars/cars.module';
import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [BrandsModule, CarsModule],
})
export class SeedModule {}
