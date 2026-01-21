import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string): Promise<T> {
    const { data } = await firstValueFrom(this.httpService.get<T>(url));
    return data;
  }
}
