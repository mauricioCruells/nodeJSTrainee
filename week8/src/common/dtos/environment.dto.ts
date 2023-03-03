import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Environment } from '../interfaces/environment.enum';

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  HOST: string;

  @IsNumber()
  PORT: number;

  @IsString()
  DB_ENGINE: string;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASS: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  JWT_SECRET: string;
}
