import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientProxy, ClientProxyFactory } from "@nestjs/microservices";
import { RmqService } from "../generics/rmq/rmq-service";
import { TeamsHandler } from "./teams.handler";
import { TeamsController } from "./teams.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    TypeOrmModule.forFeature([]),
  ],
  controllers: [TeamsController],
  providers: [
    {
      provide: 'TEAMS_SERVICE_RMQ',
      useFactory: (configService: ConfigService): ClientProxy =>
        ClientProxyFactory.create(
          new RmqService('TEAMS', configService).getConnectionRmq(),
        ),
      inject: [ConfigService],
    },
    TeamsHandler,
  ],
  exports: [],
})
export class TeamsModule {}