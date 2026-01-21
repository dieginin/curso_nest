import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [HttpModule.register({ baseURL: 'https://pokeapi.co/api/v2/' })],
})
export class SeedModule {}
