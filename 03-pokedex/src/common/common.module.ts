import { AxiosAdapter } from './adapters/axios.adapter';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
  imports: [HttpModule.register({ baseURL: 'https://pokeapi.co/api/v2/' })],
})
export class CommonModule {}
