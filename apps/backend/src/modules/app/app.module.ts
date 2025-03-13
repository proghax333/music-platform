import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrismaModule } from "../prisma/prisma.module";
import { KyselyModule } from "../kysely/kysely.module";
import { MysqlDialect } from "kysely";
import { createPool } from "mysql2";
import { ENV_DATABASE_URI, ENV_FILE_PATHS } from "@/constants";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV_FILE_PATHS,
      isGlobal: true,
    }),
    {
      module: PrismaModule,
      global: true,
    },
    KyselyModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const uri: string = configService.getOrThrow(ENV_DATABASE_URI);

        return {
          dialect: new MysqlDialect({
            pool: createPool({
              uri: uri,
            }),
          }),
        };
      },
      inject: [ConfigService],
      global: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
