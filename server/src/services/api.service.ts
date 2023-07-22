import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

const ONE_MIN_MS = 1000 * 60;

@Injectable()
export class ApiService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private http: HttpService,
  ) {}

  async getAllCompetitions() {
    const cachedRes = await this.cacheManager.get('competitions');
    if (cachedRes) {
      return cachedRes;
    }
    const response = await this.http.axiosRef.get('/competitions');
    await this.cacheManager.set('competitions', response.data, ONE_MIN_MS);
    return response.data;
  }
}
