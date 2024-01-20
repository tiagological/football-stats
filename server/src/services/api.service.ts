import { Injectable, Inject, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AxiosError } from 'axios';

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

  async getCompetitionStandings(id: string): Promise<Record<string, unknown>> {
    try {
      const cachedRes = await this.cacheManager.get(`standings-${id}`);
      if (cachedRes) {
        return cachedRes as Record<string, unknown>;
      }
      const response = await this.http.axiosRef.get(
        `/competitions/${id}/standings`,
      );
      await this.cacheManager.set(`standings-${id}`, response.data, ONE_MIN_MS);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new HttpException(
          err.response?.data.message,
          err.response?.data.error,
        );
      }
      throw err;
    }
  }
}
