import { IsNotEmpty, IsString } from 'class-validator';

export class GetStandingsQuery {
  @IsNotEmpty()
  @IsString()
  id: string;
}
