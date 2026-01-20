import { BrandsModule } from './brands/brands.module';
import { CarsModule } from './cars/cars.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CarsModule, BrandsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
