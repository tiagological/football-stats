import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CompetitionsController } from 'controllers/competitions.controller';
import { ApiService } from 'services/api.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('API_URL'),
        headers: {
          'X-Auth-Token': configService.get('API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
    CacheModule.register(),
  ],
  controllers: [CompetitionsController],
  providers: [ApiService],
})
export class ApiModule {}
