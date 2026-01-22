import { AppConfig } from './config/app.config';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { JoiValidationSchema } from './config/joi.validation';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
      validationSchema: JoiValidationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGODB!),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
