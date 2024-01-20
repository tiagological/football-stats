import { Controller, Get, Query } from '@nestjs/common';
import { ApiService } from 'services/api.service';
import { GetStandingsQuery } from './get-standings-query';

@Controller('competitions')
export class CompetitionsController {
  constructor(private apiService: ApiService) {}

  @Get('all')
  async findAll(): Promise<Record<string, unknown>> {
    return this.apiService.getAllCompetitions();
  }

  @Get('standings')
  async getStandings(
    @Query() query: GetStandingsQuery,
  ): Promise<Record<string, unknown>> {
    return this.apiService.getCompetitionStandings(query.id);
  }
}
