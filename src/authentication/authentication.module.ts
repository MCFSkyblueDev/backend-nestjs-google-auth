import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationEntity } from "@authentication/entities/authentication.entity";
import { GoogleStrategy } from "@authentication/strategies/google.strategy";
import { PassportModule } from "@nestjs/passport";
import { UserEntity } from "@model/user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AuthenticationEntity, UserEntity]), PassportModule.register({ session: true })],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, GoogleStrategy]
})
export class AuthenticationModule {
}
