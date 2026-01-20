import { BrandsModule } from './brands/brands.module';
import { CarsModule } from './cars/cars.module';
import { Module } from '@nestjs/common';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [CarsModule, BrandsModule, SeedModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
