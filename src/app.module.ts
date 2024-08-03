import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ProviderModule } from "@provider/provider.module";
import { AuthenticationModule } from "@authentication/authentication.module";
import { ModelModule } from "@model/model.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthenticationModule,
    ProviderModule,
    ModelModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
