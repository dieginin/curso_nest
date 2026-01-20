import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
