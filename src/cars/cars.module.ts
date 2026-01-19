import { CarsController } from './cars.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CarsController],
})
export class CarsModule {}
