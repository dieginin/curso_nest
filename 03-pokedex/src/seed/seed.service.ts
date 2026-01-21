import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke.response';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SeedService {
  constructor(private readonly httpService: HttpService) {}

  async executeSeed() {
    const {
      data: { results },
    } = await firstValueFrom(
      this.httpService.get<PokeResponse>('pokemon?limit=650'),
    );

    results.forEach(({ name, url }) => {
      const no = +url.split('/')[-2];
      console.log({ name, no });
    });
    return results;
  }
}

// import {
//   Injectable,
//   InternalServerErrorException,
//   Logger,
// } from '@nestjs/common';
// import { catchError, firstValueFrom } from 'rxjs';

// import { AxiosError } from 'axios';
// import { HttpService } from '@nestjs/axios';
// import { PokeResponse } from './interfaces/poke.response';

// @Injectable()
// export class SeedService {
//   private readonly logger = new Logger(SeedService.name);
//   constructor(private readonly httpService: HttpService) {}

//   async executeSeed() {
//     const {
//       data: { results },
//     } = await firstValueFrom(
//       this.httpService.get<PokeResponse>('pokemon?limit=650').pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.message);
//           throw new InternalServerErrorException('Error fetching pokemons');
//         }),
//       ),
//     );

//     results.forEach(({ name, url }) => {
//       const no = Number(url.split('/').at(-2));
//       console.log({ name, no });
//     });
//     return results;
//   }
// }

// import axios, { AxiosInstance } from 'axios';

// import { Injectable } from '@nestjs/common';
// import { PokeResponse } from './interfaces/poke.response';

// @Injectable()
// export class SeedService {
//   private readonly axios: AxiosInstance = axios;

//   async executeSeed() {
//     const { data } = await this.axios.get<PokeResponse>(
//       'https://pokeapi.co/api/v2/pokemon?limit=650',
//     );
//     data.results.forEach(({ name, url }) => {
//       const segments = url.split('/');
//       const no = +segments[segments.length - 2];
//       return { name, no };
//     });
//     return data.results;
//   }
// }
