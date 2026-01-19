import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
