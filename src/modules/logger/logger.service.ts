import {
	Injectable,
	type LoggerService as NestLoggerService,
} from "@nestjs/common";
import * as winston from "winston";
import "winston-daily-rotate-file";

@Injectable()
export class LoggerService implements NestLoggerService {
	private logger: winston.Logger;

	constructor() {
		this.logger = winston.createLogger({
			format: winston.format.combine(
				winston.format.timestamp({ format: "MM-DD HH:mm:ss" }),
				winston.format.colorize(),
				winston.format.printf(({ level, message, timestamp, context }) => {
					return `[Nest] ${timestamp} [${level}] [${context}] ${message}`;
				}),
			),
			transports: [
				new winston.transports.Console({
					level: "debug",
				}),
				new winston.transports.DailyRotateFile({
					filename: "logs/application-%DATE%.log",
					datePattern: "YYYY-MM-DD",
					zippedArchive: true,
					maxSize: "20m",
					maxFiles: "14d",
					level: "info",
				}),
			],
		});
	}

	onModuleInit() {
		this.silly("LoggerService initialized");
		this.debug("LoggerService debug level message");
		this.verbose("LoggerService verbose level message");
		this.http("LoggerService http level message");
		this.log("LoggerService log level message");
		this.warn("LoggerService warn level message");
		this.error("LoggerService error level message");
	}

	private getContext(): string {
		const stack = new Error().stack;
		const stackArray = stack?.split("\n");

		const callerLine = stackArray
			? stackArray.find((line, index) => index > 2 && line.includes("at "))
			: "";

		const classAndFunctionMatch = callerLine?.match(/at (\w+)\.(\w+)/);
		if (classAndFunctionMatch) {
			const className = classAndFunctionMatch[1];
			const functionName = classAndFunctionMatch[2];
			return `${className}::${functionName}`;
		}

		const functionName = callerLine?.match(/at (\w+)/)?.[1] || "unknown";
		return `unknown::${functionName}`;
	}

	error(message: string) {
		this.logger.error(message, { context: this.getContext() });
	}

	warn(message: string) {
		this.logger.warn(message, { context: this.getContext() });
	}

	log(message: string) {
		this.logger.info(message, { context: this.getContext() });
	}

	http(message: string) {
		this.logger.http(message, { context: this.getContext() });
	}

	verbose(message: string) {
		this.logger.verbose(message, { context: this.getContext() });
	}

	debug(message: string) {
		this.logger.debug(message, { context: this.getContext() });
	}

	silly(message: string) {
		this.logger.silly(message, { context: this.getContext() });
	}
}
