// Modules
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from 'modules/api.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ApiModule,
    CacheModule.register(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
