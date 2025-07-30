import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LoggerModule } from "./modules/logger/logger.module";
import { RedisModule } from "./modules/redis/redis.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: configService.get<string>("POSTGRES_HOST", "postgres"),
				port: 5432,
				username: configService.get<string>("POSTGRES_USER", "postgres-admin"),
				password: configService.get<string>("POSTGRES_PASSWORD", "password"),
				database: configService.get<string>("POSTGRES_DB", "postgres-db"),
				entities: [],
				synchronize: false,
				extra: {
					ssl: false,
				},
			}),
		}),
		RedisModule,
		LoggerModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
