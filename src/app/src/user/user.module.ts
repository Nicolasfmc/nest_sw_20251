import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { ClientProxy, ClientProxyFactory } from "@nestjs/microservices";
import { RmqService } from "../generics/rmq/rmq-service";
import { UserHandler } from "./user.handler";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    TypeOrmModule.forFeature([]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_SERVICE_RMQ',
      useFactory: (configService: ConfigService): ClientProxy =>
        ClientProxyFactory.create(
          new RmqService('USER', configService).getConnectionRmq(),
        ),
      inject: [ConfigService],
    },
    UserHandler,
  ],
  exports: [],
})
export class UserModule {}