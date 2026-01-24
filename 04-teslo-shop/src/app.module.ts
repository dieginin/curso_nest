import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { SeedModule } from './seed/seed.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      synchronize: true, //* SOLO DEVELOPER
      type: 'postgres',
      username: process.env.DB_USERNAME,
    }),
    ProductsModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
