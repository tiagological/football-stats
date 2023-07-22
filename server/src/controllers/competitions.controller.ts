import { Controller, Get } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { ApiService } from 'services/api.service';

@Controller('competitions')
export class CompetitionsController {
  constructor(private apiService: ApiService) {}

  @Get('all')
  async findAll(): Promise<AxiosResponse<Record<string, unknown>[]>> {
    return this.apiService.getAllCompetitions();
  }
}
