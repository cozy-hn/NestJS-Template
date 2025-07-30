import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

@Global()
@Module({
	providers: [
		{
			provide: "REDIS_CLIENT",
			useFactory: (configService: ConfigService) => {
				return new Redis({
					password: configService.get<string>("REDIS_PASSWORD", "password"),
					db: 0,
					sentinels: [
						{
							host: configService.get<string>(
								"REDIS_SENTINEL_HOST",
								"redis-sentinel",
							),
							port: parseInt(
								configService.get<string>("REDIS_SENTINEL_PORT", "26379"),
							),
						},
					],
					name: configService.get<string>(
						"REDIS_SENTINEL_MASTER_NAME",
						"mymaster",
					),
				});
			},
			inject: [ConfigService],
		},
	],
	exports: ["REDIS_CLIENT"],
})
export class RedisModule {}
