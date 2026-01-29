import { Product, ProductImage } from './entities';

import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product, ProductImage]), AuthModule],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
